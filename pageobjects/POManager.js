const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { MyCartPage } = require('./MyCartPage');
const { CheckoutPage } = require('./CheckoutPage');
const { OrderConfirmationPage } = require('./OrderConfirmationPage');
const { OrderHistoryPage } = require('./OrderHistoryPage');
const { OrderSummaryPage } = require('./OrderSummaryPage');

class POManager {
    constructor(page) {
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.mycartPage = new MyCartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.orderConfirmationPage = new OrderConfirmationPage(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
        this.orderSummaryPage = new OrderSummaryPage(page);

    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getMyCartPage() {
        return this.mycartPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getOrderConfirmationPage() {
        return this.orderConfirmationPage;
    }

    getOrderHistoryPage() {
        return this.orderHistoryPage;
    }

    getOrderSummaryPage() {
        return this.orderSummaryPage;
    }
}

module.exports = { POManager };