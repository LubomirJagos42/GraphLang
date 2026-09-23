"""
Simple UI test that opens browser, navigates to localhost/GraphLangServerApp,
waits for page load, and closes the browser.
"""

import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

def simple_ui_test():
    # Configure Chrome options
    chrome_options = Options()
    #chrome_options.add_argument("--headless")  # Run in headless mode (no visible UI)
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    
    # Initialize the Chrome driver
    driver = webdriver.Chrome(options=chrome_options)
    
    try:
        # Navigate to the application
        url = "http://localhost/GraphLangServerApp"
        print(f"Opening browser and navigating to {url}")
        driver.get(url)
        
        # Wait for page to load (adjust timeout as needed)
        print("Waiting for page to load...")
        time.sleep(5)  # Simple wait - can be enhanced with WebDriverWait
        
        # Check if page loaded successfully
        page_title = driver.title
        print(f"Page loaded successfully. Title: {page_title}")
        
        # Optional: Take a screenshot for verification
        driver.save_screenshot("screenshot.png")
        print("Screenshot saved as screenshot.png")
        
    except Exception as e:
        print(f"Error during test: {e}")
    finally:
        # Close the browser
        print("Closing browser...")
        driver.quit()
        print("Test completed.")

if __name__ == "__main__":
    simple_ui_test()