class LoginPage{

    constructor(page){
        this.page = page;
        this.userEmail = page.locator("#userEmail");
        this.userPassword = page.locator("#userPassword");
        this.loginButton = page.locator("[value='Login']");

    }

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client");

    }

    async validLogin(userEmail, userPassword){
        await this.userEmail.fill(userEmail);
        await this.userPassword.fill(userPassword);
        await this.loginButton.click();
    }
}

module.exports = {LoginPage}; //Only Classname


