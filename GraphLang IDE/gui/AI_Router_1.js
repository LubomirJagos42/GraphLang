/**
 * @class AI_Router_1
 * @augments draw2d.layout.connection.ConnectionRouter
 * @description Electrical-circuit-like (schematic) wire router for GraphLang.<br/><br/>
 *
 * How it works:
 * <ul>
 *   <li>All wires of one canvas are routed TOGETHER (global routing), not each one in isolation like the Manhattan router.
 *       Global routing is debounced: any route() request which has no valid cached result returns quick Manhattan route
 *       and schedules global re-route of whole canvas, after it finishes all wires are repainted.</li>
 *   <li>The canvas is converted into a non-uniform orthogonal grid: regular lines every GRID px plus lines exactly at
 *       port coordinates, port stubs and around every node (node bounding box inflated by MARGIN).
 *       Grid points inside nodes are blocked, so wires never go through nodes.</li>
 *   <li>Every wire is routed using A* over states (grid point, heading direction), so the number of bends can be penalized.</li>
 *   <li>Wires driven by the same output port form a NET (like in electrical schematics). Wire of the same net can share
 *       segments with its siblings (it is even cheaper), wires of different nets are heavily penalized when they overlap,
 *       run too close to each other or bend on top of another wire. Crossing of different nets is allowed but costs something.
 *       Where a net branches, a junction dot is painted.</li>
 *   <li>Wire crossing border of a structure (loop, case, ... any draw2d composite) is heavily penalized, wires should go to
 *       tunnels and not around structures.</li>
 *   <li>After the first pass a rip-up & reroute pass is done, every wire is routed again knowing all other wires.</li>
 * </ul>
 *
 * Usage:
 * <pre>
 *     connection.setRouter(new AI_Router_1());
 *     AI_Router_1.rerouteAll(canvas);                  //force re-route of all wires now
 *     AI_Router_1.installOnAllConnections(canvas);     //switch all wires on canvas to this router
 * </pre>
 */
(function () {
    "use strict";

    /*
     *  Directions are same as draw2d.geo.Rectangle.DIRECTION_* constants (UP=0, RIGHT=1, DOWN=2, LEFT=3)
     */
    const UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3;
    const DX = [0, 1, 0, -1];
    const DY = [-1, 0, 1, 0];
    const OPP = [DOWN, LEFT, UP, RIGHT];

    /**
     * @description Router tuning constants, can be changed at runtime from console, ie. AI_Router_1.CFG.BEND = 20; AI_Router_1.rerouteAll(appCanvas);
     */
    const CFG = {
        GRID: 10,               //regular grid lines step [px]
        MARGIN: 7,              //free space around node [px]
        STUB: 10,               //straight wire part going out of port [px]
        PAD: 80,                //routing area padding around all objects [px]
        WINDOW: 220,            //search window around wire bounding box [px], when no path found whole grid is used
        MIN_SEP: 7,             //different nets parallel wires closer than this are penalized [px]

        BEND: 14,               //cost of one bend
        BEND_ON_WIRE: 120,      //bend placed on other net wire (makes ambiguous T junction)
        CROSS: 10,              //crossing other net
        CROSS_CORNER: 80,       //going through corner of other net wire
        OVERLAP: 200,           //fixed cost to overlap other net
        OVERLAP_PER_PX: 20,     //cost per px when overlapping other net
        NEAR_PER_PX: 2,         //cost per px when running parallel too close to other net
        SHARE: 0.35,            //multiplier of length when running along wire of the same net
        CONTAINER: 2000,        //crossing border of structure (loop, case, ...)
        GOAL_REVERSE: 400,      //arriving into target port from wrong side
        HEURISTIC: 0.6,         //A* heuristic weight (<1 because of SHARE)

        MAX_EXPAND: 250000,     //A* expansions limit for one wire
        PASSES: 2,              //1 = only initial routing, 2 = + one rip-up & reroute pass
        TIME_BUDGET_MS: 2500,   //do not start next pass when routing takes longer
        DEBOUNCE_MS: 80,        //delay of global re-route after last change

        JUNCTION_RADIUS: 3,     //net branching dot radius [px], 0 = no dots
    };

    /*
     *  Small helpers
     */
    const rnd = function (v) { return Math.round(v * 2) / 2; };   //coordinates are snapped to 0.5px to have exact grid lines

    const lowerBound = function (arr, v) {      //first index with arr[i] >= v
        let lo = 0, hi = arr.length;
        while (lo < hi) { const m = (lo + hi) >> 1; if (arr[m] < v) lo = m + 1; else hi = m; }
        return lo;
    };

    const upperBound = function (arr, v) {      //first index with arr[i] > v
        let lo = 0, hi = arr.length;
        while (lo < hi) { const m = (lo + hi) >> 1; if (arr[m] <= v) lo = m + 1; else hi = m; }
        return lo;
    };

    /**
     * @description Binary min heap of integer states with float priorities, used by A*.
     */
    function MinHeap() { this.items = []; this.prio = []; }
    MinHeap.prototype.size = function () { return this.items.length; };
    MinHeap.prototype.push = function (item, p) {
        const items = this.items, prio = this.prio;
        let i = items.length;
        items.push(item); prio.push(p);
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (prio[parent] <= p) break;
            items[i] = items[parent]; prio[i] = prio[parent];
            i = parent;
        }
        items[i] = item; prio[i] = p;
    };
    MinHeap.prototype.pop = function () {
        const items = this.items, prio = this.prio;
        const top = items[0];
        const lastItem = items.pop(), lastPrio = prio.pop();
        const n = items.length;
        if (n > 0) {
            let i = 0;
            while (true) {
                let l = 2 * i + 1, r = l + 1, m = i;
                let mp = lastPrio;
                if (l < n && prio[l] < mp) { m = l; mp = prio[l]; }
                if (r < n && prio[r] < mp) { m = r; mp = prio[r]; }
                if (m === i) break;
                items[i] = items[m]; prio[i] = prio[m];
                i = m;
            }
            items[i] = lastItem; prio[i] = lastPrio;
        }
        return top;
    };

    /*
     *  A* work buffers are reused between searches (generation stamps), allocation is done only when grid grows.
     */
    let WORK = { size: 0, g: null, parent: null, stamp: null, closed: null, gen: 0 };
    function ensureWork(size) {
        if (WORK.size < size) {
            WORK = {
                size: size,
                g: new Float64Array(size),
                parent: new Int32Array(size),
                stamp: new Uint32Array(size),
                closed: new Uint32Array(size),
                gen: 0
            };
        }
        WORK.gen++;
        if (WORK.gen > 4000000000) { WORK.stamp.fill(0); WORK.closed.fill(0); WORK.gen = 1; }
        return WORK;
    }

    /**
     * @description Create description of wire used for routing (endpoints, stubs, directions, net).
     * @param {draw2d.Connection} conn
     * @param {Map} netIds - map source port id -> integer net id
     * @returns {Object}
     */
    function wireSpec(conn, netIds) {
        const src = conn.getSource(), dst = conn.getTarget();
        const p = conn.getStartPosition(), q = conn.getEndPosition();
        let pDir = RIGHT, qDir = LEFT;
        try { pDir = src.getConnectionDirection(dst); } catch (e) {}
        try { qDir = dst.getConnectionDirection(src); } catch (e) {}

        const netKey = src.getId();
        if (!netIds.has(netKey)) netIds.set(netKey, netIds.size);

        const px = rnd(p.x), py = rnd(p.y), qx = rnd(q.x), qy = rnd(q.y);
        return {
            conn: conn,
            id: conn.getId(),
            net: netIds.get(netKey),
            visible: conn.isVisible(),
            p: { x: p.x, y: p.y }, q: { x: q.x, y: q.y },
            pDir: pDir, qDir: qDir,
            s: { x: px + DX[pDir] * CFG.STUB, y: py + DY[pDir] * CFG.STUB },
            t: { x: qx + DX[qDir] * CFG.STUB, y: qy + DY[qDir] * CFG.STUB },
            pr: { x: px, y: py }, qr: { x: qx, y: qy },
            length: Math.abs(p.x - q.x) + Math.abs(p.y - q.y),
            key: [p.x, p.y, q.x, q.y, pDir, qDir].join(","),
            pts: null
        };
    }

    /**
     * @description Collect obstacles (nodes) and containers (loops, structures) from canvas.
     * @param {draw2d.Canvas} canvas
     */
    function collectScene(canvas) {
        const obstacles = [], containers = [];
        canvas.getFigures().each(function (i, f) {
            if (!f.isVisible()) return;
            const b = f.getBoundingBox();
            if (b.w <= 0 || b.h <= 0) return;
            if (f instanceof draw2d.shape.composite.Composite) {
                if (containers.length < 31) containers.push({ x1: b.x, y1: b.y, x2: b.x + b.w, y2: b.y + b.h });
            } else {
                obstacles.push({ x1: b.x - CFG.MARGIN, y1: b.y - CFG.MARGIN, x2: b.x + b.w + CFG.MARGIN, y2: b.y + b.h + CFG.MARGIN });
            }
        });
        return { obstacles: obstacles, containers: containers };
    }

    /**
     * @description Build non uniform orthogonal routing grid.
     * @param {Object} scene - obstacles and containers
     * @param {Array} wires - wire specs, their ports and stubs coordinates are added as grid lines
     */
    function buildGrid(scene, wires) {
        const G = CFG.GRID;
        let bx1 = Infinity, by1 = Infinity, bx2 = -Infinity, by2 = -Infinity;
        const grow = function (x1, y1, x2, y2) {
            if (x1 < bx1) bx1 = x1; if (y1 < by1) by1 = y1;
            if (x2 > bx2) bx2 = x2; if (y2 > by2) by2 = y2;
        };
        scene.obstacles.forEach(function (o) { grow(o.x1, o.y1, o.x2, o.y2); });
        scene.containers.forEach(function (o) { grow(o.x1, o.y1, o.x2, o.y2); });
        wires.forEach(function (w) {
            grow(Math.min(w.p.x, w.q.x), Math.min(w.p.y, w.q.y), Math.max(w.p.x, w.q.x), Math.max(w.p.y, w.q.y));
        });
        if (!isFinite(bx1)) { bx1 = 0; by1 = 0; bx2 = 100; by2 = 100; }
        bx1 -= CFG.PAD; by1 -= CFG.PAD; bx2 += CFG.PAD; by2 += CFG.PAD;

        const xsSet = new Set(), ysSet = new Set();
        for (let x = Math.floor(bx1 / G) * G; x <= bx2; x += G) xsSet.add(x);
        for (let y = Math.floor(by1 / G) * G; y <= by2; y += G) ysSet.add(y);
        scene.obstacles.forEach(function (o) {
            xsSet.add(rnd(o.x1)); xsSet.add(rnd(o.x2));
            ysSet.add(rnd(o.y1)); ysSet.add(rnd(o.y2));
        });
        wires.forEach(function (w) {
            [w.pr, w.qr, w.s, w.t].forEach(function (pt) { xsSet.add(rnd(pt.x)); ysSet.add(rnd(pt.y)); });
        });

        const xs = Array.from(xsSet).sort(function (a, b) { return a - b; });
        const ys = Array.from(ysSet).sort(function (a, b) { return a - b; });
        const nx = xs.length, ny = ys.length, N = nx * ny;
        const xIndex = new Map(), yIndex = new Map();
        xs.forEach(function (v, i) { xIndex.set(v, i); });
        ys.forEach(function (v, j) { yIndex.set(v, j); });

        const blocked = new Uint8Array(N);
        scene.obstacles.forEach(function (o) {
            const i0 = upperBound(xs, o.x1), i1 = lowerBound(xs, o.x2) - 1;     //strictly inside
            const j0 = upperBound(ys, o.y1), j1 = lowerBound(ys, o.y2) - 1;
            for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) blocked[j * nx + i] = 1;
        });

        const mask = new Int32Array(N);
        scene.containers.forEach(function (c, k) {
            const i0 = upperBound(xs, c.x1), i1 = lowerBound(xs, c.x2) - 1;
            const j0 = upperBound(ys, c.y1), j1 = lowerBound(ys, c.y2) - 1;
            for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) mask[j * nx + i] |= (1 << k);
        });

        return {
            xs: xs, ys: ys, nx: nx, ny: ny, N: N, xIndex: xIndex, yIndex: yIndex,
            blocked: blocked, mask: mask,
            occH: new Int32Array(N), occV: new Int32Array(N),     //net id + 1 occupying grid point, -1 = more nets
            nearH: new Int32Array(N), nearV: new Int32Array(N),   //same for "too close" neighbourhood
        };
    }

    function nodeIndex(gr, x, y) {
        const i = gr.xIndex.get(rnd(x)), j = gr.yIndex.get(rnd(y));
        if (i === undefined || j === undefined) return -1;
        return j * gr.nx + i;
    }

    function setOcc(arr, idx, net) {
        const v = arr[idx];
        if (v === 0) arr[idx] = net + 1;
        else if (v !== net + 1) arr[idx] = -1;
    }

    function clearOccupancy(gr) {
        gr.occH.fill(0); gr.occV.fill(0); gr.nearH.fill(0); gr.nearV.fill(0);
    }

    /**
     * @description Mark polyline of wire into grid occupancy arrays.
     */
    function markWire(gr, pts, net) {
        if (!pts) return;
        const xs = gr.xs, ys = gr.ys, nx = gr.nx, sep = CFG.MIN_SEP;
        for (let k = 0; k + 1 < pts.length; k++) {
            const a = pts[k], b = pts[k + 1];
            if (Math.abs(a.y - b.y) < 0.6) {                    //horizontal segment
                const j = gr.yIndex.get(rnd(a.y));
                if (j === undefined) continue;
                const i0 = lowerBound(xs, Math.min(a.x, b.x) - 0.6), i1 = upperBound(xs, Math.max(a.x, b.x) + 0.6) - 1;
                for (let i = i0; i <= i1; i++) {
                    setOcc(gr.occH, j * nx + i, net);
                    for (let jj = j - 1; jj >= 0 && ys[j] - ys[jj] < sep; jj--) setOcc(gr.nearH, jj * nx + i, net);
                    for (let jj = j + 1; jj < gr.ny && ys[jj] - ys[j] < sep; jj++) setOcc(gr.nearH, jj * nx + i, net);
                }
            } else if (Math.abs(a.x - b.x) < 0.6) {             //vertical segment
                const i = gr.xIndex.get(rnd(a.x));
                if (i === undefined) continue;
                const j0 = lowerBound(ys, Math.min(a.y, b.y) - 0.6), j1 = upperBound(ys, Math.max(a.y, b.y) + 0.6) - 1;
                for (let j = j0; j <= j1; j++) {
                    setOcc(gr.occV, j * nx + i, net);
                    for (let ii = i - 1; ii >= 0 && xs[i] - xs[ii] < sep; ii--) setOcc(gr.nearV, j * nx + ii, net);
                    for (let ii = i + 1; ii < nx && xs[ii] - xs[i] < sep; ii++) setOcc(gr.nearV, j * nx + ii, net);
                }
            }
        }
    }

    /**
     * @description A* search over (grid point, heading) states.
     * @returns {Array|null} array of grid node indexes from start stub to target stub or null
     */
    function astar(gr, sIdx, sDir, tIdx, tInDir, net, win) {
        const nx = gr.nx, ny = gr.ny, xs = gr.xs, ys = gr.ys;
        const occH = gr.occH, occV = gr.occV, nearH = gr.nearH, nearV = gr.nearV, blocked = gr.blocked, mask = gr.mask;
        const W = ensureWork(gr.N * 4);
        const g = W.g, parent = W.parent, stamp = W.stamp, closed = W.closed, gen = W.gen;
        const mine = net + 1;
        const other = function (v) { return v !== 0 && v !== mine; };

        const ti = tIdx % nx, tj = (tIdx / nx) | 0;
        const tx = xs[ti], ty = ys[tj];
        const H = CFG.HEURISTIC;

        const heap = new MinHeap();
        const s0 = sIdx * 4 + sDir;
        g[s0] = 0; stamp[s0] = gen; parent[s0] = -1;
        heap.push(s0, 0);

        let expansions = 0, found = -1;
        while (heap.size() > 0) {
            const st = heap.pop();
            if (closed[st] === gen) continue;
            closed[st] = gen;
            const u = st >> 2, pd = st & 3;
            if (u === tIdx) { found = st; break; }
            if (++expansions > CFG.MAX_EXPAND) break;

            const ui = u % nx, uj = (u / nx) | 0;
            const gu = g[st];
            const uOther = other(occH[u]) || other(occV[u]);

            for (let d = 0; d < 4; d++) {
                if (d === OPP[pd]) continue;
                const vi = ui + DX[d], vj = uj + DY[d];
                if (vi < win.i0 || vi > win.i1 || vj < win.j0 || vj > win.j1) continue;
                const v = vj * nx + vi;
                if (blocked[v] && v !== tIdx) continue;

                const horizontal = (d === RIGHT || d === LEFT);
                const len = horizontal ? Math.abs(xs[vi] - xs[ui]) : Math.abs(ys[vj] - ys[uj]);
                const occ = horizontal ? occH : occV;
                const perp = horizontal ? occV : occH;
                const near = horizontal ? nearH : nearV;

                let c = len;
                if (occ[u] === mine && occ[v] === mine) {
                    c = len * CFG.SHARE;                                            //running along own net
                } else {
                    if (other(occ[u]) && other(occ[v])) c += CFG.OVERLAP + len * CFG.OVERLAP_PER_PX;
                    if (other(near[u]) || other(near[v])) c += len * CFG.NEAR_PER_PX;
                }
                if (other(perp[v])) {
                    c += CFG.CROSS;
                    if (other(occ[v])) c += CFG.CROSS_CORNER;                       //v is corner of other wire
                }
                if (d !== pd) {
                    c += CFG.BEND;
                    if (uOther) c += CFG.BEND_ON_WIRE;
                }
                if (mask[u] !== mask[v]) c += CFG.CONTAINER;
                if (v === tIdx && d !== tInDir) c += (d === OPP[tInDir]) ? CFG.GOAL_REVERSE : CFG.BEND;

                const ns = v * 4 + d;
                const ng = gu + c;
                if (stamp[ns] !== gen || ng < g[ns]) {
                    stamp[ns] = gen; g[ns] = ng; parent[ns] = st;
                    heap.push(ns, ng + H * (Math.abs(xs[vi] - tx) + Math.abs(ys[vj] - ty)));
                }
            }
        }
        if (found < 0) return null;

        const nodes = [];
        for (let st = found; st >= 0; st = parent[st]) {
            nodes.push(st >> 2);
            if (st === s0) break;
        }
        nodes.reverse();
        return nodes;
    }

    /**
     * @description Remove duplicate and collinear points from polyline.
     */
    function simplify(pts) {
        const out = [];
        pts.forEach(function (p) {
            const last = out[out.length - 1];
            if (last && Math.abs(last.x - p.x) < 0.01 && Math.abs(last.y - p.y) < 0.01) return;
            out.push(p);
            while (out.length >= 3) {
                const a = out[out.length - 3], b = out[out.length - 2], c = out[out.length - 1];
                const sameX = Math.abs(a.x - b.x) < 0.6 && Math.abs(b.x - c.x) < 0.6;
                const sameY = Math.abs(a.y - b.y) < 0.6 && Math.abs(b.y - c.y) < 0.6;
                if (sameX || sameY) out.splice(out.length - 2, 1);
                else break;
            }
        });
        return out;
    }

    /**
     * @description Fallback route (original draw2d manhattan algorithm), used during dragging and when A* fails.
     */
    let MANHATTAN = null;
    function fallbackRoute(w) {
        if (MANHATTAN === null) MANHATTAN = new draw2d.layout.connection.ManhattanConnectionRouter();
        const pts = [];
        const collector = { addPoint: function (p) { pts.push({ x: p.x, y: p.y }); } };
        try {
            MANHATTAN._route(collector,
                new draw2d.geo.Point(w.q.x, w.q.y), w.qDir,
                new draw2d.geo.Point(w.p.x, w.p.y), w.pDir);
        } catch (e) {
            return [{ x: w.p.x, y: w.p.y }, { x: w.q.x, y: w.q.y }];
        }
        if (pts.length < 2) return [{ x: w.p.x, y: w.p.y }, { x: w.q.x, y: w.q.y }];
        return pts;
    }

    /**
     * @description Route one wire on grid with current occupancy.
     */
    function routeWire(gr, w) {
        const sIdx = nodeIndex(gr, w.s.x, w.s.y), tIdx = nodeIndex(gr, w.t.x, w.t.y);
        if (sIdx < 0 || tIdx < 0) return null;

        const tInDir = OPP[w.qDir];
        const full = { i0: 0, i1: gr.nx - 1, j0: 0, j1: gr.ny - 1 };
        const W = CFG.WINDOW;
        const win = {
            i0: Math.max(0, lowerBound(gr.xs, Math.min(w.s.x, w.t.x) - W)),
            i1: Math.min(gr.nx - 1, upperBound(gr.xs, Math.max(w.s.x, w.t.x) + W)),
            j0: Math.max(0, lowerBound(gr.ys, Math.min(w.s.y, w.t.y) - W)),
            j1: Math.min(gr.ny - 1, upperBound(gr.ys, Math.max(w.s.y, w.t.y) + W)),
        };

        let nodes = astar(gr, sIdx, w.pDir, tIdx, tInDir, w.net, win);
        if (nodes === null) nodes = astar(gr, sIdx, w.pDir, tIdx, tInDir, w.net, full);
        if (nodes === null) return null;

        const pts = [{ x: w.p.x, y: w.p.y }];
        nodes.forEach(function (n) { pts.push({ x: gr.xs[n % gr.nx], y: gr.ys[(n / gr.nx) | 0] }); });
        pts.push({ x: w.q.x, y: w.q.y });

        //port coordinates are raw (not snapped), align neighbour points to port to have exactly straight stubs
        if (pts.length >= 3) {
            if (w.pDir === LEFT || w.pDir === RIGHT) pts[1].y = w.p.y; else pts[1].x = w.p.x;
            const n = pts.length;
            if (w.qDir === LEFT || w.qDir === RIGHT) pts[n - 2].y = w.q.y; else pts[n - 2].x = w.q.x;
        }
        return simplify(pts);
    }

    /**
     * @description Per canvas router state (cache of routes, debounce timer, junction dots).
     */
    function canvasState(canvas) {
        if (!canvas.__aiRouter1) {
            const st = canvas.__aiRouter1 = { cache: new Map(), timer: null, applying: false, dots: [], lastRunMs: 0 };

            //re-route after every command (move, add, delete, connect, ...)
            try {
                canvas.getCommandStack().addEventListener(function (e) {
                    if (e.isPostChangeEvent()) AI_Router_1.schedule(canvas);
                });
            } catch (e) { console.warn("AI_Router_1: cannot install command stack listener", e); }

            //remove junction dots when canvas is cleared (ie. when other schematic is loaded)
            const origClear = canvas.clear;
            canvas.clear = function () {
                removeDots(st);
                st.cache.clear();
                return origClear.apply(this, arguments);
            };
        }
        return canvas.__aiRouter1;
    }

    function removeDots(st) {
        st.dots.forEach(function (d) { try { d.remove(); } catch (e) {} });
        st.dots = [];
    }

    /**
     * @description Paint dots where wires of one net branch.
     */
    function paintJunctions(canvas, st, wires) {
        removeDots(st);
        if (!CFG.JUNCTION_RADIUS || !canvas.paper) return;

        const byNet = new Map();
        wires.forEach(function (w) {
            if (!w.visible || !w.pts) return;
            if (!byNet.has(w.net)) byNet.set(w.net, []);
            byNet.get(w.net).push(w);
        });

        byNet.forEach(function (netWires) {
            if (netWires.length < 2) return;
            const segs = [];
            netWires.forEach(function (w) { for (let k = 0; k + 1 < w.pts.length; k++) segs.push([w.pts[k], w.pts[k + 1]]); });

            const seen = new Set();
            netWires.forEach(function (w) {
                w.pts.forEach(function (pt, idx) {
                    if (idx === 0 || idx === w.pts.length - 1) return;      //port endpoints are not junctions
                    const key = rnd(pt.x) + ";" + rnd(pt.y);
                    if (seen.has(key)) return;
                    seen.add(key);

                    let dirs = 0;
                    segs.forEach(function (sg) {
                        const a = sg[0], b = sg[1];
                        if (Math.abs(a.y - b.y) < 0.6 && Math.abs(a.y - pt.y) < 0.6) {
                            const lo = Math.min(a.x, b.x), hi = Math.max(a.x, b.x);
                            if (pt.x > lo - 0.6 && pt.x < hi + 0.6) {
                                if (hi > pt.x + 0.6) dirs |= (1 << RIGHT);
                                if (lo < pt.x - 0.6) dirs |= (1 << LEFT);
                            }
                        } else if (Math.abs(a.x - b.x) < 0.6 && Math.abs(a.x - pt.x) < 0.6) {
                            const lo = Math.min(a.y, b.y), hi = Math.max(a.y, b.y);
                            if (pt.y > lo - 0.6 && pt.y < hi + 0.6) {
                                if (hi > pt.y + 0.6) dirs |= (1 << DOWN);
                                if (lo < pt.y - 0.6) dirs |= (1 << UP);
                            }
                        }
                    });
                    const count = (dirs & 1) + ((dirs >> 1) & 1) + ((dirs >> 2) & 1) + ((dirs >> 3) & 1);
                    if (count >= 3) {
                        let color = "#000000";
                        try { color = w.conn.getColor().hash(); } catch (e) {}
                        const dot = canvas.paper.circle(pt.x, pt.y, CFG.JUNCTION_RADIUS).attr({ fill: color, stroke: color, "stroke-width": 0 });
                        st.dots.push(dot);
                    }
                });
            });
        });
    }

    /**
     * @description Route all AI_Router_1 wires on canvas together and repaint them.
     */
    function runGlobal(canvas) {
        const st = canvasState(canvas);
        st.timer = null;
        const t0 = (window.performance ? performance.now() : Date.now());

        const conns = [];
        canvas.getLines().each(function (i, c) {
            if (c instanceof draw2d.Connection && c.getRouter() instanceof AI_Router_1 && c.getSource() && c.getTarget()) conns.push(c);
        });
        if (conns.length === 0) { removeDots(st); st.cache.clear(); return; }

        const netIds = new Map();
        const wires = conns.map(function (c) { return wireSpec(c, netIds); });
        const scene = collectScene(canvas);
        const gr = buildGrid(scene, wires);

        //visible short wires first, they have less freedom, hidden wires (inactive layers) at the end and they don't block others
        const order = wires.slice().sort(function (a, b) {
            if (a.visible !== b.visible) return a.visible ? -1 : 1;
            return a.length - b.length;
        });

        //PASS 1 - initial routing
        order.forEach(function (w) {
            w.pts = routeWire(gr, w) || fallbackRoute(w);
            if (w.visible) markWire(gr, w.pts, w.net);
        });

        //PASS 2.. - rip-up & reroute, every wire knows about all others now
        for (let pass = 1; pass < CFG.PASSES; pass++) {
            const now = (window.performance ? performance.now() : Date.now());
            if (now - t0 > CFG.TIME_BUDGET_MS) break;
            order.forEach(function (w) {
                if (!w.visible) return;
                clearOccupancy(gr);
                order.forEach(function (o) { if (o !== w && o.visible) markWire(gr, o.pts, o.net); });
                const pts = routeWire(gr, w);
                if (pts) w.pts = pts;
            });
        }

        //store results and repaint wires
        const alive = new Set();
        st.applying = true;
        try {
            wires.forEach(function (w) {
                alive.add(w.id);
                st.cache.set(w.id, { key: w.key, pts: w.pts });
                w.conn.routingRequired = true;
                w.conn.svgPathString = null;
                w.conn.repaint();
            });
        } finally {
            st.applying = false;
        }
        Array.from(st.cache.keys()).forEach(function (id) { if (!alive.has(id)) st.cache.delete(id); });

        paintJunctions(canvas, st, wires);
        st.lastRunMs = (window.performance ? performance.now() : Date.now()) - t0;
    }

    /*
     *  ROUTER CLASS
     */
    const AI_Router_1 = draw2d.layout.connection.ConnectionRouter.extend({
        NAME: "AI_Router_1",

        init: function () {
            this._super();
        },

        onInstall: function (connection) {
            connection.installEditPolicy(new draw2d.policy.line.LineSelectionFeedbackPolicy());
            const canvas = connection.getCanvas();
            if (canvas) AI_Router_1.schedule(canvas);
        },

        onUninstall: function (connection) {
            const canvas = connection.getCanvas();
            if (canvas && canvas.__aiRouter1) {
                canvas.__aiRouter1.cache.delete(connection.getId());
                AI_Router_1.schedule(canvas);
            }
        },

        /**
         * @method
         * @memberOf AI_Router_1
         * @description Called by draw2d when connection needs new path. Returns cached global route if endpoints are same,
         *              otherwise quick manhattan route is used and global re-route is scheduled.
         * @param {draw2d.Connection} conn
         * @param {Object} routingHints
         */
        route: function (conn, routingHints) {
            const canvas = conn.getCanvas();
            const w = wireSpec(conn, new Map());
            let pts = null;

            if (canvas) {
                const st = canvasState(canvas);
                const cached = st.cache.get(conn.getId());
                if (cached && cached.key === w.key) {
                    pts = cached.pts;
                } else {
                    AI_Router_1.schedule(canvas);
                }
            }
            if (pts === null) pts = fallbackRoute(w);

            pts.forEach(function (p) { conn.addPoint(new draw2d.geo.Point(p.x, p.y)); });
            this._paint(conn);
        },

        canRemoveVertexAt: function (index) { return false; },
        canRemoveSegmentAt: function (index) { return false; },
    });

    AI_Router_1.CFG = CFG;

    /**
     * @description Schedule (debounced) global re-route of canvas.
     * @param {draw2d.Canvas} canvas
     */
    AI_Router_1.schedule = function (canvas) {
        const st = canvasState(canvas);
        if (st.applying) return;
        if (st.timer !== null) clearTimeout(st.timer);
        st.timer = setTimeout(function () {
            try { runGlobal(canvas); } catch (e) { st.timer = null; console.error("AI_Router_1: routing failed", e); }
        }, CFG.DEBOUNCE_MS);
    };

    /**
     * @description Immediately re-route all AI_Router_1 wires on canvas.
     * @param {draw2d.Canvas} canvas
     * @returns {number} routing time in ms
     */
    AI_Router_1.rerouteAll = function (canvas) {
        const st = canvasState(canvas);
        if (st.timer !== null) { clearTimeout(st.timer); st.timer = null; }
        st.cache.clear();
        runGlobal(canvas);
        return st.lastRunMs;
    };

    /**
     * @description Switch all connections on canvas to AI_Router_1 and route them.
     * @param {draw2d.Canvas} canvas
     */
    AI_Router_1.installOnAllConnections = function (canvas) {
        canvas.getLines().each(function (i, c) {
            if (c instanceof draw2d.Connection && !(c.getRouter() instanceof AI_Router_1)) c.setRouter(new AI_Router_1());
        });
        return AI_Router_1.rerouteAll(canvas);
    };

    /**
     * @description Routers which are replaced by AI_Router_1 when schematic is loaded (old default routers saved in JSON).
     */
    AI_Router_1.REPLACED_ROUTERS = [
        "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
        "draw2d.layout.connection.ManhattanConnectionRouter",
    ];

    /**
     * @description When true HoverConnection uses this router as default one.
     */
    AI_Router_1.IS_DEFAULT = true;

    window.AI_Router_1 = AI_Router_1;
    draw2d.layout.connection.AI_Router_1 = AI_Router_1;
})();
