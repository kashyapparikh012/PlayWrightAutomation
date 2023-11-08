const {test, expect} = require('@playwright/test');

//test.describe.configure({mode:'parallel'});   //2 tests will run in parallel with 2 workers
//test.describe.configure({mode:'serial'}); //If test1 is failed, then test2 is skipped
test('Popup validations', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://www.google.com");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    
    //Handeling pop-ups, alerts
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    //Handleing Hover
    await page.locator("#mousehover").hover();
    await page.locator(".mouse-hover-content a").first().click();

    //Handleing frames
    const framesPage =  page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
    
});

test('Taking Screenshot', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
    
       
});

// test('Visual Comparison of screenshots', async({page})=>
// {
//     await page.goto("https://www.google.com/");
//     expect(await page.screenshot()).toMatchSnapshot('landing.png');

// });