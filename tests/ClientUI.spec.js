const {test, expect} = require('@playwright/test');

test('Practice on UI automation', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/")
    console.log(await page.title());
    

    const logInTitle = page.locator("[class='login-title']");
    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const logInBtn = page.locator("#login");
    const products = page.locator(".card-body");
    const productTitle = page.locator(".card-body b");
    const productName = "iphone 13 pro";
    const cartButton = page.locator("[routerlink*='cart']");
    const checkoutButton = page.locator("text='Checkout'");
    const couponAppliedText = page.locator("div.small p.mt-1");
    //let couponBool = null;
    const selectCountry = page.locator("[placeholder*='Country']");
    const countryDropdown = page.locator(".ta-results");
    const placeOrderButton = page.locator(".action__submit");
    const orderNumberLocator = page.locator(".em-spacer-1 .ng-star-inserted");
    const orderHistoryPageLocator = page.locator("td [routerlink*='myorders']");
    const previousOrders = page.locator(".table .ng-star-inserted");
    const orderRows = page.locator("tbody tr");
    const summarayOrderID = page.locator(".col-text");
    

    const user_name = 'kyp1395@gmail.com';
    const user_password = 'Test@1234';
    

    //Login code
    console.log(await logInTitle.textContent());
    await expect(logInTitle).toContainText('Log in');
    await userName.fill(user_name);
    await password.fill(user_password);
    await logInBtn.click();
    await productTitle.first().waitFor();
    
    //console.log("First result title is: "+ await resultTitle.first().textContent());
    //await page.waitForLoadState("networkidle");
    //List all available product titles
    
    const allTitles = await productTitle.allTextContents();
    // console.log("Total number of available results are: " + allTitles.length);
    console.log(allTitles);

    //Add to cart- iphone 13 pro
    const count = await products.count();
    for(let i=0; i<count; i++){
        if(await products.nth(i).locator("b").textContent() === productName){
            
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    
    //Verify if iphone 13 pro is added into the card list
    await cartButton.click();
    await page.locator(".cart li").first().waitFor();   //this will wait until first element of cart list gets visible
    const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    expect(bool).toBeTruthy();

    //Checkout
    await checkoutButton.click();

    //Shipping Information
    await selectCountry.type("can", {delay: 100});
    await countryDropdown.waitFor();
    const optionsCount = await countryDropdown.locator("button").count();
    for(let i = 0; i<optionsCount; i++){
        const text = await countryDropdown.locator("button").nth(i).textContent();
        if(text.trim() === "Canada"){
            await countryDropdown.locator("button").nth(i).click();
            break;
        }
    }
    
    //Verify username is same as user that is logged in
    const shippingUserName = await page.locator(".user__name label");
    await expect(shippingUserName).toHaveText(user_name);

    //Personal information
    await page.locator(".field input").nth(1).fill("123");
    await page.locator(".field input").nth(2).fill("Rahul Shetty");
    await page.locator(".field input").nth(3).fill("rahulshettyacademy");
    await page.locator("button:has-text('Apply Coupon')").click();

    await couponAppliedText.waitFor();
    //const couponMessage = await couponAppliedText.textContent(); 
    // if(couponMessage === "* Coupon Applied"){
    //     console.log("Coupon Status: " + couponMessage);
    //     couponBool = true;
    // }else if(couponMessage === "* Invalid Coupon"){
    //     console.log("Coupon Status: " + couponMessage);
    //     couponBool = false;
    // }
    await expect(couponAppliedText).toHaveText("* Coupon Applied");


    //Place the order
    await placeOrderButton.click();
    await page.locator(".hero-primary").waitFor();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderNumber = await orderNumberLocator.textContent();
    const orderID = orderNumber.replaceAll('|','').trim();
    console.log("Order Number is:" + orderID);
    
    //Order History page
    await orderHistoryPageLocator.click();
    //await page.pause();
    //await page.locator(".table .ng-star-inserted").first().waitFor();
    await orderRows.first().waitFor();
    const orderCount = await orderRows.count();
    for(let i = 0; i<orderCount; i++){
        const rowOrderID = await orderRows.nth(i).locator("th").textContent();
        console.log(rowOrderID);
        if(rowOrderID === orderID){
            await orderRows.nth(i).locator(".btn-primary").click();
            break;
        }
    }
    //Validation of summaryOrderID and orderID
    await summarayOrderID.waitFor();
    expect(summarayOrderID).toHaveText(orderID);
    //await page.pause();



});
