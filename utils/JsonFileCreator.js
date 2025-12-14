const fs = require("fs");
const path = require("path");

class JsonFileCreator {

    static createEmptyJson() {
        const filePath = path.join(__dirname, "../testdata/fetchDataRunTime.json");

        const emptyJson = []; // or [] if you want array

        fs.writeFileSync(filePath, JSON.stringify(emptyJson, null, 2));

        console.log("Empty JSON file created at:", filePath);
    }

    static createEmptyArrayJson() {
        const filePath = path.join(__dirname, "../testdata/fetchDataRunTime01.json");

        fs.writeFileSync(filePath, JSON.stringify([], null, 2));

        console.log("Empty JSON array created at:", filePath);
    }
}

module.exports = JsonFileCreator;