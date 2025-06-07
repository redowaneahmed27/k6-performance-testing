import { browser } from 'k6/experimental/browser';
import { check } from 'k6';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
    scenarios: {
        browser_test: {
            executor: 'shared-iterations',
            vus: 1,
            iterations: 1,
            options: {
                browser: {
                    type: 'chromium'
                }
            }
        }
    }
};

export default async function () {
    const page = browser.newPage();
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

    // Generate Random Data
    const firstName = `User${randomString(5)}`;
    const lastName = `Test${randomString(5)}`;
    const email = `test_${randomString(8)}@mail.com`;

    // Fill Form with Random Data
    page.locator('#input-firstname').type(firstName);
    page.locator('#input-lastname').type(lastName);
    page.locator('#input-email').type(email);
    page.locator('#input-telephone').type('1234567890');
    page.locator('#input-password').type('Test123!!');
    page.locator('#input-confirm').type('Test123!!');
    page.check('input[type="checkbox"]');

    // Validate Email Field
    const emailValue = await page.locator('#input-email').inputValue();
    check(emailValue, {
        'Email is entered': (value) => value !== '',
    });

    // Submit the Form
    const submit = page.locator('input[type="submit"]');
    await Promise.all([page.waitForNavigation(), submit.click()]);

    // Validate Registration Success
    const successMessage = await page.locator('h1').textContent();
    const registrationSuccess = successMessage.includes("Your Account Has Been Created!");

    check(registrationSuccess, {
        'Registration Successful': (success) => success
    });

    // Check for Duplicate Email Error
    const errorMessageLocator = page.locator('.alert-danger');
    const errorMessage = await errorMessageLocator.textContent();
    const isDuplicateError = errorMessage.includes("Warning: E-Mail Address is already registered!");

    check(isDuplicateError, {
        'Duplicate Email Detected': (error) => error
    });

    // **Ensure Screenshot Works**
    try {
        await page.waitForTimeout(2000); // Give some time for the page to settle
        await page.screenshot({
            fullPage: true,
            path: `screenshots/registration_${randomString(5)}.png`
        });
        console.log('Screenshot captured successfully.');
    } catch (error) {
        console.error('Screenshot capture failed:', error);
    }

    await page.close();
}