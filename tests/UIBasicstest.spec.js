const {test, expect} = require('@playwright/test');
const { link } = require('fs');


test('Browser Context Playwright test', async ({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    
    //css
    await page.locator("input#username").fill("rahulshetty");
    await page.locator("[name='password']").fill("learning");
    await page.locator("#terms").click();
    await page.locator("[id='signInBtn']").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect")

});

test('Page Playwright test', async ({page})=>
{
   
    await page.goto("https://Google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});

test.only('Browser Context-Validating Error Login', async ({page})=>
{

    const userName = page.locator("input#username");
    const password = page.locator("[name='password']");
    const signInBtn = page.locator("[id='signInBtn']");
    const cardTitles = page.locator(".card-body a");

    page.route('**/*.{jpg,png,jpeg}', route=>route.abort());    //Blocking jpg,png,jpeg to appear on webpage
    page.on('request', request=>console.log(request.url()));    //displaying all request urls
    page.on('response', response=>console.log(response.url(), response.status()));  //displaying all response urls with status code
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    
    //css
    await userName.fill("rahulshetty");
    await password.fill("learning");
    await page.locator("#terms").click();
    await signInBtn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect")

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await page.locator("#terms").click();
    await signInBtn.click();
    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());
    // console.log(await cardTitles.last().textContent());

    await cardTitles.first().waitFor();
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

});

test('Validation of dropdown, radio button, checkbox and blinking text', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator("#username");
    const password = page.locator("#password");
    const radioButton = page.locator(".radiotextsty");
    const dropdown = page.locator("select.form-control");
    const checkbox = page.locator("#terms")
    const documentLink = page.locator("[href*='documents-request']");

    await userName.fill("rahulshettyacademy");
    //await page.pause();
    await password.fill("learning")
    await radioButton.last().click();
    await page.locator("#okayBtn").click();
    //console.log("Radio buttton selected: " + await radioButton.last().isChecked());
    await expect(radioButton.last()).toBeChecked();
    await dropdown.selectOption("consult");
    //await page.pause();
    await checkbox.click();
    await expect(checkbox).toBeChecked();
    //await page.pause();
    await checkbox.uncheck();
    expect(await checkbox.isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText"); //This will check if the text is blinking

});

test('Child window handling', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    const userName = page.locator("#username");

    const [newPage] = await Promise.all([
    
    context.waitForEvent('page'),
    documentLink.click(),
    ])

    //Capturing email from the text on the child page
    const text = await newPage.locator(".red").textContent();
    console.log("Text is: " + text);
    const arrayText =  text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log("Domain is: "+ domain);
    const name = arrayText[0].split(" ")[4];
    console.log("Username is :" + name);
    const email = (name + "@" + domain);
    console.log("Email is: " + email);
    
    await userName.fill(email);
    //await page.pause();
    console.log(await userName.textContent());
    


});

test('Playwrite Special Locators', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Test@1234");
    await page.getByRole('button', {name: 'Submit'}).click();
    console.log(await page.getByText("Success! The Form has been submitted successfully!.").isVisible());
    await page.getByRole('link', {name: 'Shop'}).click();
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole('button').click();
    //await page.pause();

});
