# UI Test

Simple UI test that opens a browser, navigates to localhost/GraphLangServerApp, waits for the page to load, performs DOM manipulation/checks, and closes the browser.

## JavaScript Version (Recommended)

This version uses Puppeteer for better DOM manipulation capabilities.

### Prerequisites

1. Node.js installed
2. npm installed

### Setup

Install the required dependencies:

```bash
cd GraphLang/0v1
npm install
```

### Running the Test

Make sure your local web server (XAMPP) is running and serving the GraphLangServerApp application, then run:

```bash
npm test
```

Or directly:

```bash
node GraphLang/0v1/GraphLang IDE/test/ui_test.js
```

The test will:
1. Open a Chrome browser (visible by default)
2. Navigate to http://localhost/GraphLangServerApp
3. Wait for the page to load
4. Perform DOM checks (get title, check for canvas elements)
5. Take a screenshot (saved as screenshot.png)
6. Close the browser

### Configuration

To run in headless mode (no visible browser), change the headless option in ui_test.js:

```javascript
browser = await puppeteer.launch({
    headless: true, // Set to true for headless mode
    // ...
});
```

To change the URL or add more DOM manipulations, modify the respective variables and add more `page.evaluate()` calls in the script.

## Python Version (Alternative)

Uses Selenium for browser automation.

### Prerequisites

1. Python 3.x installed
2. Chrome browser installed
3. ChromeDriver installed and in PATH (or specify path in the script)

### Setup

Install the required dependencies:

```bash
pip install -r requirements.txt
```

### Running the Test

Make sure your local web server (XAMPP) is running and serving the GraphLangServerApp application, then run:

```bash
python ui_test.py
```

### Configuration

To run with a visible browser (non-headless), comment out the headless line in ui_test.py:

```python
# chrome_options.add_argument("--headless")
```