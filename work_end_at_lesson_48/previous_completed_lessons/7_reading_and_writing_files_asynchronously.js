// 7- Reading & Writing Files Asynchronously
import fs from "fs/promises";

console.log(
    "Reading Data from 'input.txt' file process is stating...",
    "\n");

let textInputFileData = undefined;

try {
    textInputFileData = await fs.readFile(
        "./files/input.txt",
        "utf-8");
} catch (err) {
    console.error(`An Error Occur: ${err}`);
}


console.log(
    "Writing Data to 'output.txt' file process is stating...",
    "\n");

if (textInputFileData !== null || textInputFileData !== undefined) {
    try {
        await fs.writeFile(
            "./files/output.txt",
            textInputFileData,
            "utf-8");

        console.log("Writing Data to 'output.txt' file process is completed.");
    } catch (err) {
        console.error(`An Error Occur: ${err}`);
    }
}

console.log();
console.log("Program is ended.");
