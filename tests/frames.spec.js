    const {test,expect} = require("@playwright/test");
     
     
    test("Working with Frames", async({page}) =>
    {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        const framePage = await page.frameLocator("#courses-iframe");
        await framePage.locator("li a[href='lifetime-access']:visible").click();
        const text = await framePage.locator(".text h2").textContent();
        console.log(text.split(" ")[1]);

     
    })