// Import the browser module from k6's experimental browser API
import { browser } from 'k6/experimental/browser';

// Define test options, including browser scenario configuration
export const options = {
    scenarios: {
        browser_test: {
            executor: 'constant-vus', // Use constant virtual users that mean a fixed number of vartual users which will be excicuted for the specific amount of time ,mandatory fiied 
            vus: 2,                   // Number of virtual users
            duration: '15s',          // Duration for which the test runs
            options: {
                browser: {
                    type: 'chromium', // Browser type used for testing,mandatory field 
                   //Short note : K6's browser module currently supports only Chromium—Firefox support is planned but not yet available in the stable version.: 
                },
            },
        },
    },
};

// Main test function
export default async function () {
    const page = browser.newPage(); // Open a new browser page
    await page.goto('https://www.google.com/'); // (to access this page) Navigate to Google homepage
    console.log('Page loaded successfully');
    await page.close(); // Close the browser page
}


//In terminal use this command : $env:K6_BROWSER_HEADLESS="false"
// k6 run browser-test.js