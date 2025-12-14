import fs from 'fs';

const resultsFile = 'reports/results.json';
const passedLog = 'reports/passed.log';
const failedLog = 'reports/failed.log';

if (fs.existsSync(resultsFile)) {
  const data = JSON.parse(fs.readFileSync(resultsFile, 'utf-8'));
  const passed = [];
  const failed = [];

  function extractTests(suites) {
    for (const suite of suites) {
      if (suite.specs) {
        for (const spec of suite.specs) {
          for (const test of spec.tests) {
            for (const result of test.results) {
              if (result.status === 'passed') {
                passed.push(spec.title);
              } else if (result.status === 'failed') {
                failed.push(spec.title);
              }
            }
          }
        }
      }
      if (suite.suites) extractTests(suite.suites);
    }
  }

  if (data.suites) {
    extractTests(data.suites);
  }

  fs.writeFileSync(passedLog, passed.join('\n') || 'No Passed Tests', 'utf-8');
  fs.writeFileSync(failedLog, failed.join('\n') || 'No Failed Tests', 'utf-8');

  console.log('✅ Logs generated in reports/: passed.log & failed.log');
} else {
  console.error('❌ reports/results.json not found. Run tests first.');
}
