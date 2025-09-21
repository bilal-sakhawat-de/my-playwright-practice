const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/loginPage'); //Strange as l should be capital

test('Client App login E2E', async ({ page }) => {
   
   const userEmail = "bg@gmail.com";
   const userPassword = "Bg123456";
   const loginPage = new LoginPage(page);
   
   await loginPage.goTo();
   await loginPage.validLogin(userEmail, userPassword);
   await page.waitForLoadState('networkidle');
   
 
});