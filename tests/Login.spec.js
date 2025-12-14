import { test, expect } from '@playwright/test';
import { Login } from '../pages/Login.js';
import loginData from '../testdata/loginData.json' assert { type: "json" };

 
  test ('P3 - Valid Login Test', async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.goto();
    await loginPage.login(loginData.valid.username, loginData.valid.password);//Reuasble test data 
    await expect(page.locator(loginPage.dashboardHeader)).toContainText('Dashboard');//Wait till Page load
    console.log("Login Successful");
    await loginPage.clickLink("Recruitment");// A method to navigate to any left-menu item by name.
    await loginPage.clickLink("Dashboard"); 
    await loginPage.clickLink("My Info");

  });
