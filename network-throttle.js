import { browser, networkProfiles } from 'k6/experimental/browser';

export const options = {
    scenarios: {
        browser_test: {
            executor: 'shared-iterations',//We use iterations in K6 to control how many times the test runs. It helps measure performance, simulate multiple users, and ensure consistency. The shared-iterations executor distributes a fixed number of iterations among virtual users (VUs), making tests more structured and efficient
            options: {
                browser: {
                    type: 'chromium'
                }
            }
        }
    }
};

export default async function () { //export default → Makes the function the main entry point for K||async → Allows handling asynchronous operations like page navigation and API calls||() {} → Contains the test logic that runs for each iteration.
    const page = browser.newPage();
    page.setViewportSize({
        width: 414,
        height: 896
    });
    page.throttleNetwork(networkProfiles['Slow 3G']);
    await page.goto('https://www.google.com/');
    await page.close();
}