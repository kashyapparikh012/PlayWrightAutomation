const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base');
const { POManager } = require('../pageobjects/POManager');

//JSON->JSON String->JS Object
const dataset = JSON.parse(JSON.stringify(require('../utils/clientUIPOTestData.json')));

for (const data of dataset) {
    test(`Practice on UI automation for product: ${data.productName}`, async ({ page }) => {

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
        await loginPage.validLogin(data.username, data.userpassword);

        //List all available product titles and Add to cart- iphone 13 pro
        await dashboardPage.SearchProductAddCart(data.productName);

        //Navigate to Cart page
        await dashboardPage.clickOnCartButton();

        //Verify if iphone 13 pro is added into the card list
        await mycartPage.verifyIfProductIsAdded(data.productName);

        //checkout product
        await mycartPage.checkoutProduct();

        //Add Shipping country
        await checkoutPage.addShippingCountry(data.countryCode, data.countryName);

        //Verify shipping username is same as user that is logged in
        await checkoutPage.verifyShippingUsername(data.username);

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
}

customtest('Practice on UI automation', async ({ page, testDataForOrder }) => {

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
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.userpassword);

    //List all available product titles and Add to cart- iphone 13 pro
    await dashboardPage.SearchProductAddCart(testDataForOrder.productName);

    //Navigate to Cart page
    await dashboardPage.clickOnCartButton();

    //Verify if iphone 13 pro is added into the card list
    await mycartPage.verifyIfProductIsAdded(testDataForOrder.productName);

    //checkout product
    await mycartPage.checkoutProduct();

    //Add Shipping country
    await checkoutPage.addShippingCountry(testDataForOrder.countryCode, testDataForOrder.countryName);

    //Verify shipping username is same as user that is logged in
    await checkoutPage.verifyShippingUsername(testDataForOrder.username);

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
