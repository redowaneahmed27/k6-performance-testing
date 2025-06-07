// Import the browser module from K6's experimental browser API
import { browser } from 'k6/experimental/browser';

// Define test options, including browser scenario configuration
export const options = {
    scenarios: {
        browser_test: {
            executor: 'constant-vus', // Uses a fixed number of virtual users for a specific duration
            vus: 1,                   // Number of virtual users
            duration: '5s',          // Duration for which the test runs
            options: {
                browser: {
                    type: 'chromium', // Specifies browser type (Currently, only Chromium is supported)
                },
            },
        },
    },
};

// Main test function
export default async function () {
    const page = await browser.newPage(); // Await to ensure page opens correctly
    
    await page.setViewportSize({
        width: 375,
        height: 812
    }); // Set viewport size for a mobile-like resolution

    await page.goto('https://greenifyai.com/'); // Navigate to the target URL

    await page.screenshot({
        fullPage: true,
        path: 'screenshots/test2.png'
    }); // Take a full-page screenshot and save it

    await page.close(); // Ensure the browser page is properly closed
}