const { test, expect } = require('@playwright/test');

test('Security test request intercept', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/");

    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const logInBtn = page.locator("#login");
    const ordersButton = page.locator("button[routerlink*='myorders']");
    const user_name = 'kyp1395@gmail.com';
    const user_password = 'Test@1234';

    await userName.fill(user_name);
    await password.fill(user_password);
    await logInBtn.click();
    await ordersButton.click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=654910087244490f95e0bcc8" }));
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");


});