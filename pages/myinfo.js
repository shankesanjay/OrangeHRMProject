import { expect } from "@playwright/test";
import FileData from '../testdata/FileData.json' assert { type: "json" };
import { takeScreenshot } from "../utils/screenshotUtil.js";

export class MyInfo {
  constructor(page) {
    this.page = page;
    this.myInfoMenu = page.locator('//span[text()="My Info"]');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.saveButton = page.locator('button:has-text("Save")');
    this.fieName = page.locator(`//div[contains(text(),"${FileData.oldFileData.FileName}")]`);
    this.attachment = '//div[contains(text(),"test.png")]';
    this.addAttachment = '//button[normalize-space()="Add"]';
    this.browseButton = '.oxd-file-button';
    this.submit = "div[class='orangehrm-attachment'] button[type='submit']";
    this.textarea = "//textarea[@placeholder='Type comment here']";
    this.rows = '.oxd-table-card';
    this.delFile = "(//i[@class='oxd-icon bi-trash'])[2]";
    this.yesDelete = "//button[normalize-space()='Yes, Delete']";
    this.tableRows = '.oxd-table-body .oxd-table-row';

  }

  async clickLink(linkText) {
    await this.page.getByRole('link', {name: linkText}).click();
  }

   async clickLink(linkText) {
    await this.page.getByRole('link', {name: linkText}).click();
    
  }

     async validateAttachment(FileName) {

    await expect(this.fieName.locator(`text=${FileName}`)).toBeVisible();
    console.log("File Name is-"+ FileName + "  Displaying.");
    
  }

  async AttachFile(filePath) {

    await this.page.click(this.attachment)
    await this.page.click(this.addAttachment);
    await this.page.click(this.browseButton);
    await this.page.setInputFiles('input[type="file"]', filePath);
    await this.page.fill(this.textarea, FileData.newFileData.Description);
    await this.page.click(this.submit);
  }

    async validateNoOfRows() {

    const firstRows=await rows.first().textContent();
    console.log("*First Row Content*",firstRows);
    const noOfRows=await rows.all();
    console.log("*Number of rows Present*",noOfRows.length);

    }

    async deleteFile() {

       await this.page.click(this.delFile);
       await this.page.click(this.yesDelete);

    }


    async getAttachmentTableRows() {
  
    const rows =await this.page.locator(this.tableRows);
    await expect(this.page.locator(this.tableRows)).not.toHaveCount(0);
    const rowCount = await rows.count();
    // Displays No of rows Present
    console.log(" ******* Noumber of rows displaying ******** " + rowCount);
    const result = [];

    for (let i = 0; i < rowCount; i++) {

        const row = rows.nth(i).locator('.oxd-table-cell');

        const fileName     = await row.nth(1).innerText();
        const description  = await row.nth(2).innerText();
        const size         = await row.nth(3).innerText();
        const type         = await row.nth(4).innerText();
        const dateAdded    = await row.nth(5).innerText();
        const addedBy      = await row.nth(6).innerText();

        result.push({
            FileName: fileName.trim(),
            Description: description.trim(),
            Size: size.trim(),
            Type: type.trim(),
            DateAdded: dateAdded.trim(),
            AddedBy: addedBy.trim()

            
        });
    }

    return result;
    
}




}
