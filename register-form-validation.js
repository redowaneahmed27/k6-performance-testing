import { browser } from 'k6/experimental/browser';
import { check } from 'k6';

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

    // Filling the form
    page.locator('#input-firstname').type('Sadia');
    page.locator('#input-lastname').type('Meghla');
    const email = 'sadiameghla@gmail.com'; 
    page.locator('#input-telephone').type('01751719925');
    page.locator('#input-password').type('Test123!!');
    page.locator('#input-confirm').type('Test123!!');
    page.check('input[type="checkbox"]'); // Check the checkbox

    // **Email Validation (Ensuring Email is Entered)**
    const emailValue = await page.locator('#input-email').inputValue();
    check(emailValue, {
        'Email is entered': (value) => value !== '', // Check if email is not empty
    });

    // Submit the form and wait for navigation
    const submit = page.locator('input[type="submit"]');
    await Promise.all([page.waitForNavigation(), submit.click()]);

    // **Check if Registration is Successful**
    const successMessage = await page.locator('h1').textContent();
    const registrationSuccess = successMessage.includes("Your Account Has Been Created!");

    check(registrationSuccess, {
        'Registration Successful': (success) => success
    });

    // **Check for Duplicate Email Error**
    const errorMessageLocator = page.locator('.alert-danger'); // Common error message class
    const errorMessage = await errorMessageLocator.textContent();
    const isDuplicateError = errorMessage.includes("Warning: E-Mail Address is already registered!");

    check(isDuplicateError, {
        'Duplicate Email Detected': (error) => error
    });

    // Screenshot for verification
    page.screenshot({
        fullPage: true,
        path: 'screenshots/registration1_validation.png'
    });

    page.close();
}
