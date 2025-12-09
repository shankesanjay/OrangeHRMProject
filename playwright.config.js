// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';
import { TIMEOUT } from 'dns';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 40*1000,
  expect : 
  {
    timeout : 5000
  },
  reporter : 'html',

 use: {
  browserName : 'chromium',
  headless : false,
  video : 'on',
  screenshot : 'only-on-failure',// Automatic scroonshot on failure
  trace: 'retain-onfailure',//collect trace on failure
  viewreport: { width: 1280, height:720},
  baseURL: process.env.BASE_URL|| 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index',

  ignoreHTTPErrors: true,
  
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  
  },

});
module.exports= config;

