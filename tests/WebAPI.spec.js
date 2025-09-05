const { test, expect, request} = require('@playwright/test');
const loginPayload = {userEmail:"bg@gmail.com",userPassword:"Bg123456"};
const orderPayload = {"orders":[{country:"Germany",productOrderedId:"68a961719320a140fe1ca57c"}]};
let token;
let orderId;
const email= "bg@gmail.com";


test.beforeAll( async()=>{
    
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
    {
        data: loginPayload
    }
    )

    expect(loginResponse.ok()).toBeTruthy();
    const responseBody = await loginResponse.json();
    token = responseBody.token;
    console.log('Token: ', token);
    console.log(loginResponse);

    //Order Creation

    const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
        {
            data: orderPayload,
            headers:{
                'Authorization': token,
                'content-type': 'application/json'
            },
        }
    )

    expect(orderResponse.ok()).toBeTruthy();
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson.orders[0]);
    orderId = orderResponseJson.orders[0];
});

test.beforeEach( ()=>{

});
 
test('Client App login E2E', async ({ page }) => {

    await page.addInitScript(value =>{
        window.localStorage.setItem('token', value);
    }, token);
   
await page.goto("https://rahulshettyacademy.com/client");
//    await page.locator("#userEmail").fill(email);
//    await page.locator("#userPassword").fill("Bg123456");
//    await page.locator("[value='Login']").click();
//    await page.waitForLoadState('networkidle');

//    const productName = 'ZARA COAT 3';
//    const products = page.locator(".card-body");
//    await page.locator(".card-body b").first().waitFor();
//    const titles = await page.locator(".card-body b").allTextContents();
//    console.log(titles); 
//    const count = await products.count();
//    for (let i = 0; i < count; ++i) {
//       if (await products.nth(i).locator("b").textContent() === productName) {
//          //add to cart
//          await products.nth(i).locator("text= Add To Cart").click();
//          break;
//       }
//    }
 
//    await page.locator("[routerlink*='cart']").click();
//    //await page.pause();
 
//    await page.locator("div li").first().waitFor();
//    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
//    expect(bool).toBeTruthy();
//    await page.locator("text=Checkout").click();
 
//    await page.locator("[placeholder*='Country']").pressSequentially("pak", { delay: 150 });
//    const dropdown = page.locator(".ta-results");
//    await dropdown.waitFor();
//    const optionsCount = await dropdown.locator("button").count();
//    for (let i = 0; i < optionsCount; ++i) {
//       const text = await dropdown.locator("button").nth(i).textContent();
//       if (text === " Pakistan") {
//          await dropdown.locator("button").nth(i).click();
//          break;
//       }
//    }
 
//    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
//    await page.locator(".action__submit").click();
//    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
//    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
//    console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
 
});