const fs = require("fs");
const path = require("path");

class JsonUtils {

    static addData(newObj) {
        const filePath = path.join(__dirname, "../testdata/fetchDataRunTime.json");

        // Read file
        let fileContent = fs.readFileSync(filePath, "utf-8");
        let jsonData = JSON.parse(fileContent);

        // Add new object
        jsonData.push(newObj);

        // Write updated file
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

        console.log("Data added successfully!");
    }
}

module.exports = JsonUtils;