class DashboardPage {
    
    constructor(page) {
        this.products = page.locator(".card-body");
        this.productTitle = page.locator(".card-body b");
        this.cartButton = page.locator("[routerlink*='cart']");
    }

    async SearchProductAddCart(productName) {
        await this.productTitle.first().waitFor();
        //List all available product titles
        const allTitles = await this.productTitle.allTextContents();
        console.log(allTitles);
        //Add to cart- iphone 13 pro
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {

                //add to cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async clickOnCartButton() {
        await this.cartButton.click();
    }

    
};

module.exports = { DashboardPage };