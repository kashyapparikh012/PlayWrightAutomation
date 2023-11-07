const { test, expect } = require('@playwright/test');
class MyCartPage {

    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator("text='Checkout'");
    }

    async verifyIfProductIsAdded(productName) {
        //Verify if iphone 13 pro is added into the card list
        await this.page.locator(".cart li").first().waitFor();   //this will wait until first element of cart list gets visible
        const bool = await this.page.locator("h3:has-text('" + productName + "')").isVisible();
        expect(bool).toBeTruthy();
    }

    async checkoutProduct() {
        //Checkout
        await this.checkoutButton.click();
    }


}

module.exports = { MyCartPage };