const fs = require('fs');
const path = require('path');

async function runAllTests() {
    const distDir = path.join(__dirname, 'dist');
    
    // Get all subdirectories in dist folder
    const subdirs = fs.readdirSync(distDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    
    console.log(`Found ${subdirs.length} test subdirectories: ${subdirs.join(', ')}`);
    
    let passedTests = 0;
    let failedTests = 0;
    
    for (const subdir of subdirs) {
        const testDir = path.join(distDir, subdir);
        const testFiles = fs.readdirSync(testDir)
            .filter(file => file.endsWith('.js'));
        
        console.log(`\n--- Running tests in ${subdir} ---`);
        
        for (const testFile of testFiles) {
            const testPath = path.join(testDir, testFile);
            console.log(`Running: ${subdir}/${testFile}`);
            
            try {
                // Dynamically require and run the test
                delete require.cache[require.resolve(testPath)];
                const testModule = require(testPath);
                
                // Call the runTest function if it exists
                if (testModule && testModule.runTest) {
                    await testModule.runTest();
                } else {
                    await require(testPath);
                }
                
                console.log(`✓ Test passed: ${subdir}/${testFile}`);
                passedTests++;
            } catch (error) {
                console.error(`✗ Test failed: ${subdir}/${testFile}`);
                console.error(`Error: ${error.message}`);
                failedTests++;
            }
        }
    }
    
    console.log('\n=== Test Summary ===');
    console.log(`Total tests: ${passedTests + failedTests}`);
    console.log(`Passed: ${passedTests}`);
    console.log(`Failed: ${failedTests}`);
    
    if (failedTests > 0) {
        process.exit(1);
    }
}

runAllTests().catch(error => {
    console.error('Error running tests:', error);
    process.exit(1);
});
