const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');

Given('A login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    //Login code
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTO();
    await loginPage.validLogin(username, password);
});

When('Adding {string} to cart', async function (productName) {
    const dashboardPage = this.poManager.getDashboardPage();
    //List all available product titles and Add to cart- iphone 13 pro
    await dashboardPage.SearchProductAddCart(productName);

    //Navigate to Cart page
    await dashboardPage.clickOnCartButton();
});

Then('Verify that {string} is displayed in the cart', async function (productName) {
    const mycartPage = this.poManager.getMyCartPage();

    //Verify if iphone 13 pro is added into the card list
    await mycartPage.verifyIfProductIsAdded(productName);

    //checkout product
    await mycartPage.checkoutProduct();

});

When('Verify {string} as shipping username, enter valid details and Place the order', async function (username) {
    const checkoutPage = this.poManager.getCheckoutPage();
    //Add Shipping country
    await checkoutPage.addShippingCountry("cub", "Cuba");

    //Verify shipping username is same as user that is logged in
    await checkoutPage.verifyShippingUsername(username);

    //Personal information
    await checkoutPage.addPersonalInfo();

    //Apply coupon
    await checkoutPage.applyCoupon();

    //Place the order
    await checkoutPage.placeOrder();
});

Then('Verify order is present in the Order History page', async function () {
    const orderConfirmationPage = this.poManager.getOrderConfirmationPage();
    const orderHistoryPage = this.poManager.getOrderHistoryPage();
    const orderSummaryPage = this.poManager.getOrderSummaryPage();
    //Verify if order is successfully placed   
    const orderID = await orderConfirmationPage.getOrderNumber();

    //Order History page
    await orderHistoryPage.viewOrder(orderID);

    //Order Summary Page-Validation of summaryOrderID and orderID
    await orderSummaryPage.verifySummaryOrderID(orderID);
});

//Sceanrio:2
Given('A login to Ecommerce2 application with {string} and {string}',  { timeout: 100 * 1000 }, async function (useranme, password) {
    const userName = this.page.locator("input#username");
    const userPassword = this.page.locator("[name='password']");
    const signInBtn = this.page.locator("[id='signInBtn']");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());

    //css
    await userName.fill(useranme);
    await userPassword.fill(password);
    await this.page.locator("#terms").click();
    await signInBtn.click();
});

Then('Verify Message is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText("Incorrect")
});


Then('Display all available product titles', async function () {
    this.cardTitles = this.page.locator(".card-body a");
    await this.cardTitles.first().waitFor();
    const allTitles = await this.cardTitles.allTextContents();
    console.log(allTitles);
});

