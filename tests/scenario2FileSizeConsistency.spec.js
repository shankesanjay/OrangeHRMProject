import { test, expect } from '@playwright/test';
import { Login } from '../pages/Login.js';
import loginData from '../testdata/loginData.json' assert { type: "json" };
import FileData from '../testdata/FileData.json' assert { type: "json" };
import fetchDataRunTime from '../testdata/fetchDataRunTime.json' assert { type: "json" };
import { MyInfo } from '../pages/myinfo.js';
import { assert } from 'console';

let UploadedFileSize;
const filePath ='utils/testAutomation.txt'
const fs = require('fs');
const stats = fs.statfsSync(filePath);
 
  test ('P2 - Scenario 2: File Size Consistency', async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.goto();
    await loginPage.login(loginData.valid.username, loginData.valid.password);//Reuasble test data 
    await expect(page.locator(loginPage.dashboardHeader)).toContainText('Dashboard');//Wait till Page load
    console.log("Login Successful");
    const myInfo = new MyInfo(page);
    await myInfo.clickLink("My Info"); // A method to navigate to any left-menu item by Link name.
    await myInfo.validateAttachment(FileData.oldFileData.FileName);
    await myInfo.AttachFile(filePath);// File Upload 
    const attachments = await myInfo.getAttachmentTableRows();
    console.log("***** All tables fetched Succesfully ******")
    console.log(attachments);
  // Uploaded file size 
    const match = attachments.find(r => r.FileName === 'testAutomation.txt');
    const NewUploadecFileSize= match.Size;
  
  // Uploaed file : Details  
    console.log("*********Uploaded file details fetched successfully*****");
    console.log(match);
    console.log("Uploaded File size stored in variable - NewUploadecFileSize: "+ NewUploadecFileSize);
  //compairing two file old file size and new file size 
    let oldFileSize =fetchDataRunTime[0].Size ;
    console.log(oldFileSize);
    expect(NewUploadecFileSize).toEqual(oldFileSize);


    await myInfo.deleteFile();// Delete File
    console.log("***** After Delete row count and data ******")
    const AfterDeleteAttach = await myInfo.getAttachmentTableRows();
    console.log(AfterDeleteAttach);
   
  });