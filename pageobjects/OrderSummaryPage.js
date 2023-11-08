const { test, expect } = require('@playwright/test');

class OrderSummaryPage {
    constructor(page) {
        this.summarayOrderID = page.locator(".col-text");
    }

    async verifySummaryOrderID(orderID) {
        await this.summarayOrderID.waitFor();
        await expect(this.summarayOrderID).toHaveText(orderID);
    }

}

module.exports = { OrderSummaryPage };