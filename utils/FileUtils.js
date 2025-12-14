const fs = require("fs");
const path = require("path");

class FileUtils {

    static deleteJsonFile() {
        const filePath = path.join(__dirname, "../testdata/fetchDataRunTime.json");

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log("JSON file deleted successfully.");
        } else {
            console.log("JSON file does not exist!");
        }
    }
}

module.exports = FileUtils;