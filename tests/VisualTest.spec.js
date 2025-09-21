    const {test,expect} = require("@playwright/test");

    test('Visual Testing', async({page})=>{

        page.goto('https://www.google.com/');
        expect(await page.screenshot()).toMatchSnapshot('compared.png');

    })