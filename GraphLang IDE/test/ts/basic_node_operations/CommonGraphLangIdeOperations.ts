/**
 *  @description Common operations used in IDE which can be used to automatize tests, this methods mimics user operation in IDE.
 */

import puppeteer from 'puppeteer';

interface TestConfig {
    baseUrl: string;
    loginUrl: string;
    targetUrl: string;
    username: string;
    password: string;
}

class CommonGraphLangIdeOperations {
    protected browser: any = null;
    protected page: any = null;
    protected config: TestConfig;

    protected placedNodesIdList: {id: string, name: string}[] = [];

    constructor() {
        this.config = {
            baseUrl: 'http://localhost/GraphLangServerApp',
            loginUrl: 'http://localhost/GraphLangServerApp/?q=userLoginForm',
            targetUrl: 'http://localhost/GraphLangServerApp/?q=projectCategoriesNodesEditor&projectId=20',
            username: 'lubomir.jagos@hidden-mail.com',
            password: 'heslo123'
        };
    }

    /**
     * Setup method - opens browser and performs login once for all tests
     */
    async setup(): Promise<void> {
        try {
            console.log('Launching browser...');
            this.browser = await puppeteer.launch({
                headless: false,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

            this.page = await this.browser.newPage();
            await this.page.setViewport({ width: 1280, height: 800 });

            // Capture browser console output
            this.page.on('console', (msg: any) => {
                const type = msg.type();
                const text = msg.text();
                if (type === 'error') {
                    console.error(`[Browser Console ERROR] ${text}`);
                } else if (type === 'warning') {
                    console.warn(`[Browser Console WARN] ${text}`);
                } else {
                    console.log(`[Browser Console] ${text}`);
                }
            });

            console.log(`Navigating to login page: ${this.config.loginUrl}`);
            await this.page.goto(this.config.loginUrl, {
                waitUntil: 'networkidle2',
                timeout: 30000
            });

            console.log('Waiting for page to load...');
            await this.page.waitForSelector('body', { timeout: 10000 });
            await this.page.waitForTimeout(2000);

            // Perform login
            console.log('Attempting to login...');
            await this.page.waitForSelector('form[name="loginForm"]', { timeout: 5000 });

            // Fill in username
            const usernameInput = await this.page.$('input[name="username"]');
            if (usernameInput) {
                await usernameInput.click();
                await usernameInput.type(this.config.username);
                console.log('Username entered');
            } else {
                throw new Error('Could not find username input field');
            }

            // Fill in password
            const passwordInput = await this.page.$('input[name="password"]');
            if (passwordInput) {
                await passwordInput.click();
                await passwordInput.type(this.config.password);
                console.log('Password entered');
            } else {
                throw new Error('Could not find password input field');
            }

            // Submit login form
            const submitButton = await this.page.$('input[type="submit"]');
            if (submitButton) {
                await submitButton.click();
                console.log('Login form submitted');
            } else {
                throw new Error('Could not find submit button');
            }

            console.log('Waiting for login to complete...');
            await this.page.waitForTimeout(3000);

            console.log('✓ Login successful');
        } catch (error) {
            console.error('✗ Setup failed:', error);
            throw error;
        }
    }

    async dragDropNodeFromLeftMenu(nodeName: string, dropX: number, dropY: number): Promise<void> {
        if (!this.page) throw new Error('Page not initialized. Call setup() first.');

        try {
            console.log('\n--- Test 3: Drag and Drop Begin Block ---');
            
            // Wait for the schematic editor to fully load
            await this.page.waitForTimeout(2000);

            // Use search to find the node in the left menu
            console.log('Searching for "' + nodeName + '" block using search input...');
            
            // Find and clear the search input
            const searchInput = await this.page.$('#menu_node_search');
            if (!searchInput) {
                throw new Error('Could not find search input #menu_node_search');
            }
            
            // Clear the search input and type the node name
            await searchInput.click();
            await this.page.keyboard.down('Control');
            await this.page.keyboard.press('A');
            await this.page.keyboard.up('Control');
            await this.page.keyboard.press('Backspace');
            
            // Type the node name character by character to trigger events
            await searchInput.type(nodeName, { delay: 50 });
            
            // Wait for the search to filter results
            await this.page.waitForTimeout(500);
            
            // Now find the node in the filtered results
            const nodeLeftMenuInfo = await this.page.evaluate((nodeName) => {
                const elements = Array.from(
                    document.querySelectorAll('#navigation > span > div')
                );
                for (const el of elements) {
                    if (el.textContent && el.textContent.search(nodeName) > -1) {
                        const boundingBox = el.getBoundingClientRect();
                        return {
                            x: boundingBox.left,
                            y: boundingBox.top,
                            width: boundingBox.width,
                            height: boundingBox.height
                        };
                    }
                }
                return null;
            }, nodeName);

            if (!nodeLeftMenuInfo) {
                throw new Error(`Could not find "${nodeName}" block in the menu after search input was filled`);
            }

            console.log('Found "' + nodeName + '" block');
            console.log('Node position:', nodeLeftMenuInfo);

            // Get canvas dimensions and position using the HTML canvas element
            console.log('Getting canvas dimensions and position...');
            const canvasDimensions = await this.page.evaluate(() => {
                const canvasElement = document.getElementById('canvas');
                if (!canvasElement) {
                    return {
                        success: false,
                        error: 'Canvas element with id #canvas not found'
                    };
                }

                const rect = canvasElement.getBoundingClientRect();
                return {
                    success: true,
                    width: rect.width,
                    height: rect.height,
                    x: rect.left,
                    y: rect.top
                };
            });

            if (!canvasDimensions.success) {
                throw new Error(`Could not get canvas dimensions: ${canvasDimensions.error}`);
            }

            console.log('Canvas dimensions:', canvasDimensions);

            // Calculate drop position: canvas offset + desired drop position
            const canvasDropX = canvasDimensions.x + dropX;
            const canvasDropY = canvasDimensions.y + dropY;

            console.log('Drop coordinates:', { canvasDropX, canvasDropY });

            console.log('Performing drag and drop...');

            // Perform drag and drop
            await this.page.mouse.move(nodeLeftMenuInfo.x + nodeLeftMenuInfo.width / 2, nodeLeftMenuInfo.y + nodeLeftMenuInfo.height / 2);
            await this.page.mouse.down();
            await this.page.mouse.move(canvasDropX, canvasDropY, { steps: 10 });
            await this.page.mouse.up();

            console.log('Drag and drop completed');
            await this.page.waitForTimeout(2000);

            const canvasFigures = await this.page.evaluate(() => {
                const list = (window as any).appCanvas.getFigures();
                const arr = list.data ? list.data : list;   // raw array, read-only use
                return arr.map((f: any) => ({ NAME: f.NAME, type: f.type, id: f.id }));
            });
            console.log('Figures on canvas after drop:', canvasFigures);

            const placedNode = await this.page.evaluate((nodeName: string) => {
                const list = (window as any).appCanvas.getFigures();
                const arr = list.data ? list.data : list;
                const f = arr.find((x: any) => x.NAME && x.NAME.toLowerCase().includes(nodeName.toLowerCase()));
                return f ? { id: f.id, NAME: f.NAME } : null;
            }, nodeName);
            
            if (!placedNode){
                throw new Error(`Node ${nodeName} not found on canvas, was not placed properly!`);
            }
            let nodeInfo = {id: placedNode.id, name: placedNode.NAME};
            this.placedNodesIdList.push(nodeInfo);
            console.log(`Node pushed into internal node list: ${JSON.stringify(nodeInfo)}`);

            console.log('✓ Test 3 passed: Successfully dragged and dropped begin block');
        } catch (error) {
            console.error('✗ Test 3 failed:', error);
            throw error;
        }
    }

        private async getPortScreenPosition(figureNameOrId: string, portName: string) {
        return await this.page.evaluate((figureNameOrId: string, portName: string) => {
            const canvas = (window as any).appCanvas;

            // Prefer the canvas lookup by id, fall back to scanning the raw array
            let figure = canvas.getFigure(figureNameOrId);
            if (!figure) {
                const all = canvas.getFigures();
                const arr = all.data ? all.data : all;   // ArrayList keeps its items in .data
                figure = arr.find((f: any) => f.NAME === figureNameOrId || f.id === figureNameOrId);
            }
            if (!figure) {
                return { success: false, error: `Figure "${figureNameOrId}" not found` };
            }

            if (typeof figure.getPort !== 'function') {
                return {
                    success: false,
                    error: `figure.getPort missing. ctor=${figure.constructor && figure.constructor.name}, ` +
                        `keys=${Object.keys(figure).slice(0, 30).join(',')}`
                };
            }

            const port = figure.getPort(portName);
            if (!port) {
                return { success: false, error: `Port "${portName}" not found on "${figureNameOrId}"` };
            }

            const pos = port.getAbsolutePosition();
            const docPos = canvas.fromCanvasToDocumentCoordinate(pos.x, pos.y);
            return { success: true, x: docPos.x - window.scrollX, y: docPos.y - window.scrollY };
        }, figureNameOrId, portName);
    }

    async connectPorts(sourceFigureNameOrId: string, sourcePortName: string, targetFigureNameOrId: string, targetPortName: string): Promise<void> {
        const src = await this.getPortScreenPosition(sourceFigureNameOrId, sourcePortName);
        if (!src.success) throw new Error(src.error);

        const dst = await this.getPortScreenPosition(targetFigureNameOrId, targetPortName);
        if (!dst.success) throw new Error(dst.error);

        await this.page.mouse.move(src.x, src.y);
        await this.page.mouse.down();
        await this.page.mouse.move(dst.x, dst.y, { steps: 10 });
        await this.page.mouse.up();
    }

    async testPlaceNodesOnCanvas(){
        await this.dragDropNodeFromLeftMenu("begin", 100, 300);
        await this.dragDropNodeFromLeftMenu("println", 300, 300);
        await this.dragDropNodeFromLeftMenu("ConstantNode", 150, 150);
        await this.connectPorts(
            this.placedNodesIdList[0].id, 'errorOut',
            this.placedNodesIdList[1].id, 'errorIn'
        );
        await this.connectPorts(
            this.placedNodesIdList[1].id, 'in1',
            this.placedNodesIdList[2].id, 'out1'
        );
    }

    /**
     * Teardown method - closes browser
     */
    async teardown(): Promise<void> {
        try {
            if (this.browser) {
                console.log('\nClosing browser...');
                await this.browser.close();
                console.log('Browser closed');
            }
        } catch (error) {
            console.error('Error during teardown:', error);
        }
    }

}

export{
    CommonGraphLangIdeOperations
}
