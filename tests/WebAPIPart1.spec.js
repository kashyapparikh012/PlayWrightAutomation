const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');

const loginPayload = {userEmail:"kyp1395@gmail.com",userPassword:"Test@1234"};
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6262e990e26b7e1a10e89bfa"}]}

let response;

test.beforeAll(async()=>{

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    //Adding comment

});

test.beforeEach(()=>{

});


test('Place the order- login using API, create order using API', async({page})=>
{ 
    
    //Inject token into the local storage of the browser
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/")
    
    const orderHistoryPageLocator = page.locator("[routerlink*='myorders']");
    const orderRows = page.locator("tbody tr");
    const summarayOrderID = page.locator(".col-text");
     
    //Order History page
    await orderHistoryPageLocator.click();
    //await page.pause();
    //await page.locator(".table .ng-star-inserted").first().waitFor();
    await orderRows.first().waitFor();
    const orderCount = await orderRows.count();
    for(let i = 0; i<orderCount; i++){
        const rowOrderID = await orderRows.nth(i).locator("th").textContent();
        console.log(rowOrderID);
        if(response.orderID.includes(rowOrderID)){
            await orderRows.nth(i).locator(".btn-primary").click();
            break;
        }
    }
    //Validation of summaryOrderID and orderID
    await summarayOrderID.waitFor();
    const orderIDDetails = await summarayOrderID.textContent();
    expect(response.orderID.includes(orderIDDetails)).toBeTruthy();
    //await page.pause();


});

