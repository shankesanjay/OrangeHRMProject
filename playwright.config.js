// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';
import { TIMEOUT } from 'dns';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({

  workers: 1,
  FullyParallel : true,
  testDir: './tests',
  timeout: 40*1000,
  expect : 
  {
    timeout : 5000
  },
 reporter: [["html", { outputFolder: "playwright-report" }]],

 use: {
  browserName : 'chromium',
  headless : false,
  video : 'on',
  screenshot : 'only-on-failure',// Automatic scroonshot on failure
  trace: 'retain-onfailure',//collect trace on failure
  viewreport: { width: 1280, height:720},
  baseURL: 'https://opensource-demo.orangehrmlive.com/',
  
  
  ignoreHTTPErrors: true,
  
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  
  },

});
module.exports= config;

