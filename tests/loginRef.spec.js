const {test, expect} = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

let FirstfileSize;
const filePath ='utils/testAutomation.txt'
const fs = require('fs');
const stats = fs.statfsSync(filePath);

test('Scenario 01: Attachment Management',async ({browser, page})=>
{

const Attachment = page.locator("//div[contains(text(),'test.png')]");
const submit = page.locator("div[class='orangehrm-attachment'] button[type='submit']");
const textarea = page.locator("textarea[placeholder='Type comment here']");
const rows = page.locator(".oxd-table-card");
const delFile= page.locator("(//i[@class='oxd-icon bi-trash'])[2]");
const yesDelete = page.locator("//button[normalize-space()='Yes, Delete']");

//Login To Application
const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login("Admin", "admin123");
console.log("Login Successful");
await loginPage.MyInfo();
await expect(Attachment).toBeVisible();
//Add Attachment
await loginPage.AttachFile();
await page.setInputFiles('input[type="file"]', filePath);
await textarea.fill("Orange Hrm Automation Upload")
await submit.click();
//Validate no of file present 
const firstRows=await rows.first().textContent();
console.log("*First Row Content*",firstRows);
const noOfRows=await rows.all();
console.log("*Number of rows Present*",noOfRows.length);
// Get File details 
const fName = await loginPage.fileNamee();
expect(fName.trim()).toBe('testAutomation.txt');
const descrip = await loginPage.Descrep();
expect(descrip.trim()).toBe('Orange Hrm Automation Upload');
const dateAdd = await loginPage.Dateaddd();
expect(dateAdd.trim()).toBe('2025-09-12');
const addedBy = await loginPage.addeByadm();
expect(addedBy.trim()).toBe('Admin');
const FileSize = await loginPage.fileeSizee();
expect(FileSize.trim()).toBe('35.00 B');
console.log("File Size:",FileSize);
FirstfileSize = FileSize;

//Delete file
//loginPage.deleteFile();
await delFile.click();
await yesDelete.click();
//Validate only one row after file deleted
const afterDelRows=await rows.first().textContent();
const afterDelnoOfRows=await rows.all();
console.log("*Number of rows Present*",afterDelnoOfRows.length)

});

test('Scenario 02: File Size Consistency',async ({browser, page})=>
{

const Attachment = page.locator("//div[contains(text(),'test.png')]");
const submit = page.locator("div[class='orangehrm-attachment'] button[type='submit']");
const textarea = page.locator("textarea[placeholder='Type comment here']");
const rows = page.locator(".oxd-table-card");
const UplodedfileSize = page.locator("//div[contains(text(),'35.00 B')]");
const delFile= page.locator("(//i[@class='oxd-icon bi-trash'])[2]");
const yesDelete = page.locator("//button[normalize-space()='Yes, Delete']");

const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login("Admin", "admin123");
console.log("Login Successful");
await loginPage.MyInfo();
await expect(Attachment).toBeVisible();
// Upload file 
await loginPage.AttachFile();
await page.setInputFiles('input[type="file"]', filePath);
await textarea.fill("Orange Hrm Automation Upload")
await submit.click();

// compare old  file size and new file size
const NewfileSize = await UplodedfileSize.textContent();
console.log("File Size:",NewfileSize);
// Compairing with old file 
expect (NewfileSize).toEqual(FirstfileSize)
//expect(NewfileSize).toMatch(FirstfileSize);

//Delete file
await delFile.click();
await yesDelete.click();
//Validate only one row 
const afterDelRows=await rows.first().textContent();
const afterDelnoOfRows=await rows.all();
console.log("*Number of rows Present*",+ afterDelnoOfRows.length)

});



test ('Login Using Invalid Credentials',async ({browser, page})=>
{

const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login("Admffin", "admffin123");
console.log("Login Successful");
const invalidcred = page.locator(".oxd-text.oxd-text--p.oxd-alert-content-text");
const invaliduser = await invalidcred.innerText();
console.log(invaliduser);
expect(invaliduser).toMatch("Invalid credentials");

});