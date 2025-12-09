
ADMIN_USER = Admin
ADMIN_PASS =admin123

let fSize;
const filePath = 'test-data/testAutomation.txt'
const fs = require('fs');
const stats = fs.statfsSync(filePath);

module.exports = {
    BASE_URL:process.env.BASE_URL,
    ADMIN_USER:process.env.ADMIN_USER,
    ADMIN_PASS:process.env.ADMIN_PASS,
}