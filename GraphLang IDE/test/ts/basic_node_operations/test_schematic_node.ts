/**
 * TypeScript UI test class for basic node operations in GraphLang
 * Tests browser login, navigation to schematic editor, and drag-drop operations
 */

import puppeteer from 'puppeteer';
import { CommonGraphLangIdeOperations } from './CommonGraphLangIdeOperations';

class GraphLangNodeOperationsTest extends CommonGraphLangIdeOperations {
    constructor() {
        super();

        //...add additional stuff if needed...
    }

    /**
     * Test 1: Navigate to project categories nodes editor
     */
    async testNavigateToProjectEditor(): Promise<void> {
        if (!this.page) throw new Error('Page not initialized. Call setup() first.');

        try {
            console.log('\n--- Test 1: Navigate to Project Categories Nodes Editor ---');
            
            console.log('Navigating to project categories nodes editor...');
            await this.page.goto(this.config.targetUrl, {
                waitUntil: 'networkidle2',
                timeout: 30000
            });

            console.log('Waiting for page to load...');
            await this.page.waitForSelector('body', { timeout: 10000 });
            await this.page.waitForTimeout(3000);

            // Verify we're on the correct page
            const pageCheck = await this.page.evaluate(() => {
                const bodyText = document.body.innerText.toLowerCase();
                return {
                    hasProjectContent: bodyText.includes('project') && bodyText.includes('editor'),
                    hasCategories: bodyText.includes('category'),
                    pageContent: document.body.innerText.substring(0, 500)
                };
            });

            console.log('Page verification:', pageCheck);
            
            if (!pageCheck.hasProjectContent) {
                throw new Error('Project editor content not found');
            }

            console.log('✓ Test 1 passed: Successfully navigated to project editor');
        } catch (error) {
            console.error('✗ Test 1 failed:', error);
            throw error;
        }
    }

    /**
     * Test 2: Click on "NEW SCHEMATIC" button
     */
    async testClickNewSchematic(): Promise<void> {
        if (!this.page) throw new Error('Page not initialized. Call setup() first.');

        try {
            console.log('\n--- Test 2: Click on NEW SCHEMATIC ---');
            
            // Look for the NEW SCHEMATIC button/link
            console.log('Searching for NEW SCHEMATIC button...');
            
            // Try multiple selectors for the NEW SCHEMATIC button
            const newSchematicSelectors = [
                'a:contains("NEW SCHEMATIC")',
                'button:contains("NEW SCHEMATIC")',
                'input[value="NEW SCHEMATIC"]',
                '[title="NEW SCHEMATIC"]',
                '*:contains("NEW SCHEMATIC")'
            ];

            let newSchematicButton = null;
            
            // Try to find the button using text content
            newSchematicButton = await this.page.evaluateHandle(() => {
                const allElements = Array.from(document.querySelectorAll('*'));
                for (const element of allElements) {
                    if (element.textContent && element.textContent.trim() === 'NEW SCHEMATIC') {
                        return element;
                    }
                }
                return null;
            });

            if (newSchematicButton) {
                console.log('Found NEW SCHEMATIC button');
                await (newSchematicButton as any).click();
                console.log('Clicked NEW SCHEMATIC button');
            } else {
                throw new Error('Could not find NEW SCHEMATIC button');
            }

            console.log('Waiting for schematic editor to load...');
            await this.page.waitForTimeout(3000);

            console.log('✓ Test 2 passed: Successfully clicked NEW SCHEMATIC');
        } catch (error) {
            console.error('✗ Test 2 failed:', error);
            throw error;
        }
    }

    /**
     * Run all tests in sequence
     */
    async runAllTests(): Promise<void> {
        try {
            console.log('========================================');
            console.log('Starting GraphLang Node Operations Tests');
            console.log('========================================');

            // Setup - open browser and login once
            await this.setup();

            // Run all tests
            await this.testNavigateToProjectEditor();
            await this.testClickNewSchematic();
            await this.testPlaceNodesOnCanvas();

            console.log('\n========================================');
            console.log('✓ All tests passed successfully');
            console.log('========================================');

        } catch (error) {
            console.error('\n========================================');
            console.error('✗ Test suite failed');
            console.error('========================================');
            throw error;
        } finally {
            await this.teardown();
        }
    }

}

// Export the test class and runner
export { GraphLangNodeOperationsTest };

// Run the tests if executed directly
async function runTest(): Promise<void> {
    const test = new GraphLangNodeOperationsTest();
    await test.runAllTests();
}

if (require.main === module) {
    runTest().catch(error => {
        console.error('Test execution failed:', error);
        process.exit(1);
    });
}

module.exports = { runTest, GraphLangNodeOperationsTest };
