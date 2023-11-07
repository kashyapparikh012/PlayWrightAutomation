const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

const loginPayload = { userEmail: "kyp1395@gmail.com", userPassword: "Test@1234" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6262e990e26b7e1a10e89bfa" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    //Adding comment

});

test.beforeEach(() => {

});


test('Response Intercepting faking response', async ({ page }) => {

    //Inject token into the local storage of the browser
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill(
                {
                    response,
                    body,
                })
            //intercepting response- API response->{playwright fakeresponse}->browser->render data on front
        });

    const orderHistoryPageLocator = page.locator("[routerlink*='myorders']");
    //Order History page
    await orderHistoryPageLocator.click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());



});

