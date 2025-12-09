const { test, expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;

    // locators
    this.username = 'input[placeholder="Username"]';
    this.password = 'input[placeholder="Password"]';
    this.loginBtn = 'button[type="submit"]';
    this.myInfo = '//span[normalize-space()="My Info"]';
    this.attachment = '//div[contains(text(),"test.png")]';
    this.addAttachment = '//button[normalize-space()="Add"]';
    this.browseButton = '.oxd-file-button';
    this.submit = 'div[class="orangehrm-attachment"] button[type="submit"]';
    this.setPath= page.locator('input[type="file"]');
    this.textarea = page.locator('#textarea[placeholder="Type comment here"]');  
    this.rows = page.locator('.oxd-table-card');
    this.fileName = page.locator('//div[contains(text(),"testAutomation.txt")]');
    this.description = page.locator('//div[contains(text(),"Orange Hrm Automation Upload")]');
    this.dateAdded = page.locator('(//div[@role="cell"])[14]//div[1]');
    this.addeBy = page.locator('(//div[contains(text(),"Admin")])[2]');
    this.fileSize = page.locator('//div[contains(text(),"35.00 B")]');
    this.delFile = '(//i[@class="oxd-icon bi-trash"])[2]';
    this.yesDelete = '//button[normalize-space()="Yes, Delete"]';
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  }

  async login(user, pass) {
    await this.page.fill(this.username, user);
    await this.page.fill(this.password, pass);
    await this.page.click(this.loginBtn);
   
    
  }

  async MyInfo() {

    await this.page.click(this.myInfo);
  
  }

    async AttachFile() {

    await this.page.click(this.attachment)
    await this.page.click(this.addAttachment);
    await this.page.click(this.browseButton);
   
  }

  async fileNamee() {

     console.log("Validating Record Details") ;
     return await this.fileName.textContent();
     
  }
  async Descrep() {

     return await this.description.textContent();
  
  }
  async Dateaddd() {

     return await this.dateAdded.textContent();

  }
  async addeByadm() {

  return await this.addeBy.textContent();
   
  }
   async fileeSizee() {

     return await this.fileSize.textContent();
  }

  
   async deleteFile() {

  await this.page.click(this.delFile)
  await this.page.click(this.yesDelete)
  
  }

  async ValidateAfterDelete() {

     return await this.rows.textContent();
  }

}

module.exports = LoginPage;