const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            username: "kyp1395@gmail.com",
            userpassword: "Test@1234",
            productName: "zara coat 3",
            countryCode: "cub",
            countryName: "Cuba"

        }
    }
)