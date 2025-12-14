import { test, expect } from '@playwright/test';
import { Login } from '../pages/Login.js';
import loginData from '../testdata/loginData.json' assert { type: "json" };
import FileData from '../testdata/FileData.json' assert { type: "json" };
import { MyInfo } from '../pages/myinfo.js';
import { assert } from 'console';
import JsonUtils from '../utils/JsonUtils.js';
const FileUtils = require("../utils/FileUtils");
const JsonFileCreator = require("../utils/JsonFileCreator");
let UploadedFileSize;
const filePath ='utils/testAutomation.txt'
const fs = require('fs');
const stats = fs.statfsSync(filePath);
 
  test ('P1 - Scenario 1: Attachment Management', async ({ page }) => {
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
    const FileName= match.FileName;
    const Description= match.Description;
    UploadedFileSize= match.Size;
    const Type= match.Type;
    const DateAdded= match.DateAdded;
    const AddedBy= match.AddedBy;
    expect(Description).toEqual(FileData.newFileData.Description);
    expect(FileName).toEqual(FileData.newFileData.FileName);
    expect(AddedBy).toEqual(FileData.newFileData.AddedBy);
    FileUtils.deleteJsonFile();
    JsonFileCreator.createEmptyJson();     
    JsonUtils.addData(match);
  // comparing data 
  // UPloaed file : Details  
  console.log("*********Uploaded file details fetched successfully*****");
    console.log(match);
    console.log("Uploaded File size stored in variable - UploadecFileSize: "+ UploadedFileSize);
  //   second row file size 
  //   const firstRow = attachments[1];
  //   const SecondRowFileSize = firstRow.Size;
  //   console.log("First Row File Size is UploadecFileSize "+ SecondRowFileSize);
    await myInfo.deleteFile();// Delete File
    console.log("***** After Delete row count and data ******")
    const AfterDeleteAttach = await myInfo.getAttachmentTableRows();
    console.log(AfterDeleteAttach);

    
  });