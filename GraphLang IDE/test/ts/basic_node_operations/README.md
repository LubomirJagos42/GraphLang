# Basic Node Operations Test

This test suite performs browser automation tests for GraphLang's basic node operations.

## Test Structure

The test is implemented as a class `GraphLangNodeOperationsTest` with the following methods:

### Setup/Teardown
- `setup()` - Opens browser and performs login once for all tests
- `teardown()` - Closes browser after all tests complete

### Test Methods
1. `testNavigateToProjectEditor()` - Navigates to the project categories nodes editor page
2. `testClickNewSchematic()` - Clicks on the "NEW SCHEMATIC" button
3. `testDragDropBeginBlock()` - Drags and drops the "begin" block from the left menu to the canvas
4. `testVerifyNodeOnCanvas()` - Verifies that the node is present on canvas using the JavaScript command:
   ```javascript
   appCanvas.getFigures().each((figureIndex, figureRef)=>{console.log(`--> ${figureRef.NAME}`)})
   ```

## Configuration

The test uses the following configuration:
- Base URL: `http://localhost/GraphLangServerApp`
- Login URL: `http://localhost/GraphLangServerApp/?q=userLoginForm`
- Target URL: `http://localhost/GraphLangServerApp/?q=projectCategoriesNodesEditor&projectId=20`
- Username: `lubomir.jagos@hidden-mail.com`
- Password: `heslo123`

## Running the Tests

### Run all tests in the suite:
```bash
cd "C:\User_installed_programs\XAMPP\htdocs\GraphLangServerApp\GraphLang\0v1\GraphLang IDE\test\ts"
npm run test:node-operations
```

### Build and run:
```bash
npm run build
node dist/basic_node_operations/schematic_node_test.js
```

### Run with ts-node (development mode):
```bash
npm run test:node-operations
```

## Test Flow

1. **Setup**: Browser opens and user logs in once
2. **Test 1**: Navigate to project categories nodes editor
3. **Test 2**: Click "NEW SCHEMATIC" button
4. **Test 3**: Drag "begin" block from left menu to canvas
5. **Test 4**: Verify node is present on canvas using JavaScript command
6. **Teardown**: Browser closes

## Key Features

- Single browser instance used for all tests (setup once, run multiple tests)
- Class-based structure for better organization and reusability
- Comprehensive error handling and logging
- Specific canvas verification using the exact JavaScript command provided
- Non-headless mode by default for visibility during development
