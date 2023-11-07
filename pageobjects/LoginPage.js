class LoginPage
{

    constructor(page){
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.logInBtn = page.locator("#login");
    }

    async goTO(){
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }

    async validLogin(username, userpassword){
        await this.userName.fill(username);
        await this.password.fill(userpassword);
        await this.logInBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports={LoginPage};