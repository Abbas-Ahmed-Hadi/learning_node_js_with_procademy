// 5- Reading & Writing Files Synchronously
import fs from "fs";

const fileTextContent = fs.readFileSync(
    "./files/input.txt",
    "utf-8");

console.log(fileTextContent);
console.log();

const textToStoreInOutputTextFile = 
    `Data from 'input.txt' text: [${new Date()}]
    ${fileTextContent}\n`;

fs.writeFileSync(
    "./files/output.txt",
    textToStoreInOutputTextFile);
