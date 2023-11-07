const { test, expect } = require('@playwright/test');

class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.couponAppliedText = page.locator("div.small p.mt-1");
        this.selectCountry = page.locator("[placeholder*='Country']");
        this.countryDropdown = page.locator(".ta-results");
        this.placeOrderButton = page.locator(".action__submit");
        
    }

    async addShippingCountry(countryCode, countryName) {
        //Shipping Information
        await this.selectCountry.type(countryCode, { delay: 100 });
        await this.countryDropdown.waitFor();
        const optionsCount = await this.countryDropdown.locator("button").count();
        for (let i = 0; i < optionsCount; i++) {
            const text = await this.countryDropdown.locator("button").nth(i).textContent();
            if (text.trim() === countryName) {
                await this.countryDropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async verifyShippingUsername(username) {
        //Verify username is same as user that is logged in
        const shippingUserName = await this.page.locator(".user__name label");
        await expect(shippingUserName).toHaveText(username);
    }

    async addPersonalInfo() {
        await this.page.locator(".field input").nth(1).fill("123");
        await this.page.locator(".field input").nth(2).fill("Rahul Shetty");
    }

    async applyCoupon() {
        await this.page.locator(".field input").nth(3).fill("rahulshettyacademy");
        await this.page.locator("button:has-text('Apply Coupon')").click();
        await this.couponAppliedText.waitFor();
        await expect(this.couponAppliedText).toHaveText("* Coupon Applied");
    }

    async placeOrder(){
        await this.placeOrderButton.click();
    }

}

module.exports = { CheckoutPage };