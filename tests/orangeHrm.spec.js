// tests/login.test.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test ('Login to Orange HRM Application Validate Title', async ({ page }) => {

  const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("Admiggn", "admin1283");
    console.log("Login Successful");

  // simple assertion example:
    console.log(await page.title());
    await expect(page).toHaveTitle("OrangeHRM");   

    


 

});

