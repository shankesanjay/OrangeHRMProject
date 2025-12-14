import { expect } from "@playwright/test";
import { takeScreenshot } from "../utils/screenshotUtil.js";


export class Login {
  constructor(page) {
    this.page = page;
    this.LoginHead='[class="oxd-text oxd-text--h5 orangehrm-login-title"]'
    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'button[type="submit"]';
    this.errorMessage = '.oxd-alert-content-text';
    this.dashboardHeader = 'h6.oxd-topbar-header-breadcrumb-module';
   
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await takeScreenshot(this.page, "LoginPage");// Take screenshot with timestamp
    await this.page.click(this.loginButton);
  }

  async clickLink(linkText) {
    await this.page.getByRole('link', {name: linkText}).click();
  }

}
