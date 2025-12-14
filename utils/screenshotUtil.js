import fs from "fs";
import path from "path";

export async function takeScreenshot(page, fileNamePrefix = "screenshot") {
    
    const folder = "screenshots";

    // Create folder if not exists
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }

    // Timestamp
    const now = new Date();
    const timestamp =
        now.getFullYear() + "-" +
        (now.getMonth() + 1).toString().padStart(2, "0") + "-" +
        now.getDate().toString().padStart(2, "0") + "_" +
        now.getHours().toString().padStart(2, "0") + "-" +
        now.getMinutes().toString().padStart(2, "0") + "-" +
        now.getSeconds().toString().padStart(2, "0");

    // Final file path
    const filePath = path.join(folder, `${fileNamePrefix}-${timestamp}.png`);

    // IMPORTANT → filePath must be a string
    console.log("Saving screenshot →", filePath);

    await page.screenshot({ path: filePath });

    return filePath;   // MUST return
}