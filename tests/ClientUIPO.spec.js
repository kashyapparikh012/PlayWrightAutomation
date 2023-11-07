const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

test('Practice on UI automation', async ({ page }) => {
    const username = 'kyp1395@gmail.com';
    const userpassword = 'Test@1234';
    const productName = "iphone 13 pro";
    const countrycode = "ind";
    const countryName = "India";
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const mycartPage = poManager.getMyCartPage();
    const checkoutPage = poManager.getCheckoutPage();
    const orderConfirmationPage = poManager.getOrderConfirmationPage();
    const orderHistoryPage = poManager.getOrderHistoryPage();
    const orderSummaryPage = poManager.getOrderSummaryPage();

    loginPage.goTO();
    //Login code
    await loginPage.validLogin(username, userpassword);

    //List all available product titles and Add to cart- iphone 13 pro
    await dashboardPage.SearchProductAddCart(productName);

    //Navigate to Cart page
    await dashboardPage.clickOnCartButton();

    //Verify if iphone 13 pro is added into the card list and checkout
    await mycartPage.checkoutProduct(productName);

    //Add Shipping country
    await checkoutPage.addShippingCountry(countrycode, countryName);

    //Verify shipping username is same as user that is logged in
    await checkoutPage.verifyShippingUsername(username);

    //Personal information
    await checkoutPage.addPersonalInfo();

    //Apply coupon
    await checkoutPage.applyCoupon();

    //Place the order
    await checkoutPage.placeOrder();

    //Verify if order is successfully placed   
    const orderID = await orderConfirmationPage.getOrderNumber();

    //Order History page
    await orderHistoryPage.viewOrder(orderID);

    //Order Summary Page-Validation of summaryOrderID and orderID
    await orderSummaryPage.verifySummaryOrderID(orderID);


});
