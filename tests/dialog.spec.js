    const {test,expect} = require("@playwright/test");
     
     
    test("Dialog Confirm & Dismiss", async({page}) =>
    {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        await page.locator("#confirmbtn").click();
        page.on('dialog', async dialog => {
            await dialog.accept();
        })
     
    })