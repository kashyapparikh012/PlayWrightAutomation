const {test, expect} = require('@playwright/test');

class OrderConfirmationPage {
    constructor(page) {
        this.page = page;
        this.orderNumberLocator = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderHistoryPageLocator = page.locator("td [routerlink*='myorders']");

    }

    async getOrderNumber() {   
        await this.page.locator(".hero-primary").waitFor();
        await expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const orderNumber = await this.orderNumberLocator.textContent();
        const orderID = orderNumber.replaceAll('|', '').trim();
        console.log("Order Number is:" + orderID);
        await this.orderHistoryPageLocator.click();
        return orderID;
    }
}

module.exports = { OrderConfirmationPage };