const { BeforeAll, AfterAll, Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');

BeforeAll(function () {
    console.log("This will execute only once before first scenario!!");
});

Before(async function () {
    console.log("This will execute before each scenario!");
    //const browser = await playwright.chromium.launch();
    const browser = await playwright.chromium.launch({ headless: false });    //Runs in headed mode
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

BeforeStep(function () {
    console.log("This will execute before each step");
});

AfterStep(async function ({ result }) {
    console.log("This will execute after each test");
    // This hook will be executed after all steps, and take a screenshot on step failure
    if (result.status === Status.FAILED) {
        await this.page.screenshot({path: 'screenshot1.png'});
    }
});

After(function () {
    console.log("This will execute after each scenario!");
});

AfterAll(function () {
    // perform some shared teardown
    console.log("This will execute only once after last scenario!!");
});