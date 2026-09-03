import fs from "fs/promises";

const text = "This is a very long file which we want to read from Node.js and send it in the response.This is a very long file which we want to read from Node.js and send it in the response.";
const data = [];

const LINE_OF_TEXT = 1_000_000;

for (let i = 0; i < LINE_OF_TEXT; i++) {
    data.push(text);
}

console.log("Writing to file is started.");

await fs.writeFile(
    "./large_text_file.txt",
    data.join('\n'));
    
console.log("Writing to file is completed.");
