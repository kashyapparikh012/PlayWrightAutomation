class OrderHistoryPage {
    constructor(page) {
        this.orderRows = page.locator("tbody tr");


    }

    async viewOrder(orderID) {
        await this.orderRows.first().waitFor();
        const orderCount = await this.orderRows.count();
        for (let i = 0; i < orderCount; i++) {
            const rowOrderID = await this.orderRows.nth(i).locator("th").textContent();
            //console.log("Row order ID is: " + rowOrderID);
            if (rowOrderID === orderID) {
                await this.orderRows.nth(i).locator(".btn-primary").click();
                break;
            }
        }
    }
}

module.exports = { OrderHistoryPage };