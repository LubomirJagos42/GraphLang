/**
 * Simple UI test that opens browser, navigates to localhost/GraphLangServerApp,
 * waits for page load, performs DOM manipulation/checks, and closes the browser.
 */

const puppeteer = require('puppeteer');

async function simpleUITest() {
    let browser;
    
    try {
        // Launch browser (headless: false to see the browser)
        browser = await puppeteer.launch({
            headless: false, // Set to true for headless mode
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Navigate to the application
        const url = 'http://localhost/GraphLangServerApp';
        console.log(`Opening browser and navigating to ${url}`);
        
        await page.goto(url, { 
            waitUntil: 'networkidle2', // Wait for network to be idle
            timeout: 30000 
        });
        
        console.log('Waiting for page to load...');
        
        // Wait for page to be fully loaded
        await page.waitForSelector('body', { timeout: 10000 });
        
        // Additional wait to ensure dynamic content loads
        await page.waitForTimeout(2000);
        
        console.log('Page loaded successfully. Performing DOM analysis...');
        
        // Example DOM manipulation - get body content
        const pageContent = await page.evaluate(() => {
            return {
                title: document.title,
                bodyText: document.body.innerText.substring(0, 200),
                hasCanvas: document.querySelector('canvas') !== null,
                elementCount: document.querySelectorAll('*').length,
                scriptCount: document.querySelectorAll('script').length
            };
        });
        
        console.log('DOM Analysis:');
        console.log('- Title:', pageContent.title);
        console.log('- Content preview:', pageContent.bodyText);
        console.log('- Canvas element found:', pageContent.hasCanvas);
        console.log('- Total DOM elements:', pageContent.elementCount);
        console.log('- Script tags:', pageContent.scriptCount);
        
        // Take a screenshot
        await page.screenshot({ path: 'screenshot.png' });
        console.log('Screenshot saved as screenshot.png');
        
        // Optional: Wait a bit longer to see the page
        await page.waitForTimeout(3000);
        
    } catch (error) {
        console.error('Error during test:', error);
    } finally {
        if (browser) {
            console.log('Closing browser...');
            await browser.close();
            console.log('Test completed.');
        }
    }
}

// Run the test
simpleUITest();