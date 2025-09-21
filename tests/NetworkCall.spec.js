const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('./utils/APiUtils.js');
const loginPayLoad = {userEmail:"bg@gmail.com",userPassword:"Bg123456"};
const orderPayLoad = {orders :[{country:"Germany",productOrderedId:"68a961719320a140fe1ca57c"}]};
const fakePayLoadOrders = { data: [], message: "No Orders" };
 
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
 
})
 
 
//create order is success
test('Intercepting the API response for No orders', async ({ page }) => {
  await page.addInitScript(value => {
 
    window.localStorage.setItem('token', value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");
  console.log("Login Ji");
 
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill(
        {
          response,
          body, 
 
        });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });
 
  await page.locator("button[routerlink*='myorders']").click();

  //await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
  
  console.log(await page.locator(".mt-4").textContent());
 
 
 
});