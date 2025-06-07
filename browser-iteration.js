// Import the browser module from k6's experimental browser API
import { browser } from 'k6/experimental/browser';

// Define test options
export const options = {
    scenarios: {
        browser_test: {
            executor: 'per-vu-iterations', // Ensures each VU runs a fixed number of iterations
            vus: 2,  // Number of virtual users (VUs) running in parallel
            iterations: 3, // Each VU runs 3 iterations (Total = 2 VUs * 3 iterations = 6 executions)
            options: {
                browser: {
                    type: 'chromium', // Specifies browser type (currently, only Chromium is supported)
                },
            },
        },
    },
};

// Main test function
export default async function () {
    const page = browser.newPage(); // Open a new browser page
    await page.goto('https://payra-sams-admin.saams.xyz/'); // Navigate to the target page
    console.log('Page loaded successfully'); // Log message when page loads
    await page.close(); // Close the browser page
}

// **Run this command in PowerShell to execute the script in non-headless mode**
// $env:K6_BROWSER_HEADLESS="false"
// k6 run browser-test.js

// ================================================
// Alternative Execution Methods for K6 Browser Testing
// ================================================

// Shared Iterations: Distributes a fixed number of iterations across multiple VUs
/*
export const options = {
    scenarios: {
        browser_test: {
            executor: 'shared-iterations',
            vus: 2,               // Number of virtual users
            iterations: 6,        // Total iterations shared across VUs
            options: {
                browser: { type: 'chromium' },
            },
        },
    },
};
*/

// Constant VUs: Runs a fixed number of users for a specific duration
/*
export const options = {
    scenarios: {
        browser_test: {
            executor: 'constant-vus',
            vus: 2,                // Number of virtual users
            duration: '30s',       // Run test for 30 seconds
            options: {
                browser: { type: 'chromium' },
            },
        },
    },
};
*/

// Ramping VUs: Simulates increasing and decreasing traffic over time
/*
export const options = {
    scenarios: {
        browser_test: {
            executor: 'ramping-vus',
            startVUs: 1,           // Start with 1 VU
            stages: [
                { duration: '10s', target: 5 },  // Increase to 5 VUs in 10s
                { duration: '20s', target: 2 },  // Decrease to 2 VUs in 20s
            ],
            options: {
                browser: { type: 'chromium' },
            },
        },
    },
};
*/

// Variable Arrival Rate: Controls the rate at which new VUs start
/*
export const options = {
    scenarios: {
        browser_test: {
            executor: 'constant-arrival-rate',
            rate: 2,               // Start 2 iterations per second
            timeUnit: '1s',        // Time unit for the arrival rate
            duration: '30s',       // Run test for 30 seconds
            preAllocatedVUs: 5,    // Allocate VUs ahead of time
            options: {
                browser: { type: 'chromium' },
            },
        },
    },
};
*/

