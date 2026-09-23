/**
 * TypeScript UI test that opens browser, logs in as user,
 * navigates to project categories nodes editor with table view,
 * and verifies that project schematic nodes content is displayed.
 */

import puppeteer from 'puppeteer';

interface TestConfig {
    baseUrl: string;
    loginUrl: string;
    targetUrl: string;
    username: string;
    password: string;
}

const config: TestConfig = {
    baseUrl: 'http://localhost/GraphLangServerApp',
    loginUrl: 'http://localhost/GraphLangServerApp/?q=userLoginForm',
    targetUrl: 'http://localhost/GraphLangServerApp/?q=projectCategoriesNodesEditor&projectId=20&viewType=1',
    username: 'lubomir.jagos@hidden-mail.com',
    password: 'heslo123'
};

async function loginAndVerifyProjectContent(): Promise<void> {
    let browser;
    
    try {
        console.log('Launching browser...');
        browser = await puppeteer.launch({
            headless: false, // Set to true for headless mode
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Set viewport size for better visibility
        await page.setViewport({ width: 1280, height: 800 });
        
        // Navigate to login page
        console.log(`Navigating to login page: ${config.loginUrl}`);
        await page.goto(config.loginUrl, { 
            waitUntil: 'networkidle2',
            timeout: 30000 
        });
        
        console.log('Waiting for page to load...');
        await page.waitForSelector('body', { timeout: 10000 });
        await page.waitForTimeout(2000);
        
        // Perform login
        console.log('Attempting to login...');
        
        // Wait for the login form to be present
        await page.waitForSelector('form[name="loginForm"]', { timeout: 5000 });
        
        // Fill in username
        const usernameInput = await page.$('input[name="username"]');
        if (usernameInput) {
            await usernameInput.click();
            await usernameInput.type(config.username);
            console.log('Username entered');
        } else {
            throw new Error('Could not find username input field');
        }
        
        // Fill in password
        const passwordInput = await page.$('input[name="password"]');
        if (passwordInput) {
            await passwordInput.click();
            await passwordInput.type(config.password);
            console.log('Password entered');
        } else {
            throw new Error('Could not find password input field');
        }
        
        // Click the submit button (the form's onsubmit handler will handle MD5 hashing)
        const submitButton = await page.$('input[type="submit"]');
        if (submitButton) {
            await submitButton.click();
            console.log('Login form submitted');
        } else {
            throw new Error('Could not find submit button');
        }
        
        console.log('Login form submitted. Waiting for navigation...');
        await page.waitForTimeout(3000);
        
        // Navigate directly to the project categories nodes editor with viewType=1 for table view
        console.log('Navigating to project categories nodes editor with table view...');
        await page.goto(config.targetUrl, { 
            waitUntil: 'networkidle2',
            timeout: 30000 
        });
        
        console.log('Waiting for page to load...');
        await page.waitForSelector('body', { timeout: 10000 });
        await page.waitForTimeout(3000);
        
        // Verify that project schematic nodes are displayed
        console.log('Verifying project schematic nodes display...');
        
        const pageCheck = await page.evaluate(() => {
            const bodyText = document.body.innerText.toLowerCase();
            
            // Check for table elements
            const tables = document.querySelectorAll('table');
            const hasTable = tables.length > 0;
            
            // Check for content related to nodes/schematic/categories
            const hasNodes = bodyText.includes('node') || bodyText.includes('schematic');
            const hasCategories = bodyText.includes('category');
            const hasProjectContent = bodyText.includes('project') && (bodyText.includes('editor') || bodyText.includes('categories'));
            
            // Check for table content related to nodes/schematic
            let hasNodeTable = false;
            tables.forEach((table: any) => {
                const tableText = table.innerText.toLowerCase();
                if (tableText.includes('node') || tableText.includes('schematic') || tableText.includes('category')) {
                    hasNodeTable = true;
                }
            });
            
            // Check for table rows
            const tableRows = document.querySelectorAll('table tr');
            const hasRows = tableRows.length > 1; // More than just header row
            
            return {
                hasTable,
                hasNodeTable,
                hasNodes,
                hasCategories,
                hasProjectContent,
                tableCount: tables.length,
                rowCount: tableRows.length,
                pageContent: document.body.innerText.substring(0, 800)
            };
        });
        
        console.log('Page Verification Results:');
        console.log('- Table found:', pageCheck.hasTable);
        console.log('- Node/schematic table found:', pageCheck.hasNodeTable);
        console.log('- Nodes content found:', pageCheck.hasNodes);
        console.log('- Categories content found:', pageCheck.hasCategories);
        console.log('- Project content found:', pageCheck.hasProjectContent);
        console.log('- Total tables:', pageCheck.tableCount);
        console.log('- Table rows:', pageCheck.rowCount);
        console.log('- Page content preview:', pageCheck.pageContent);
        
        // Take screenshot for verification
        await page.screenshot({ path: './ts_test_screenshot.png' });
        console.log('Screenshot saved as ts_test_screenshot.png');
        
        // Assert that we found project schematic nodes content
        if (!pageCheck.hasProjectContent) {
            throw new Error('Project categories/nodes content not found on the page');
        }
        
        if (!pageCheck.hasCategories && !pageCheck.hasNodes) {
            throw new Error('No categories or nodes content found on the page');
        }
        
        console.log('✓ Test passed: Project schematic nodes are displayed');
        
        // Wait a bit longer to see the result
        await page.waitForTimeout(3000);
        
    } catch (error) {
        console.error('✗ Test failed:', error);
        throw error;
    } finally {
        if (browser) {
            console.log('Closing browser...');
            await browser.close();
            console.log('Test completed.');
        }
    }
}

// Export the test function for running by test runner
async function runTest(): Promise<void> {
    return loginAndVerifyProjectContent();
}

// Make the function available when required
module.exports = { runTest };

// Run the test if executed directly
if (require.main === module) {
    runTest().catch(error => {
        console.error('Test execution failed:', error);
        process.exit(1);
    });
}
