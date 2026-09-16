// 23- Understanding Streams in Practice
/* 
  ====================
   You have to create 
   text file first to 
   read it later.
  ====================
*/

import http from "http";
import fs from "fs";

const server = http.createServer();

server.on("request", (req, res) => {
    const path = req.url?.toLowerCase() ?? "";
    
    console.log("Request:", path);
    if (path === "") {
        console.error("Request Path Is Empty.");
        reture;
    }
    
    let rs = fs.createReadStream("./large_text_file.txt");
    
    console.log("Streaming data from text file to response, is started.");
    
    rs.on("data", (chunk) => {
        res.write(chunk);
    });
    
    rs.on("end", () => {
        res.writeHead(200, { "content-type": "plain/text" });
        res.end();
    });
    
    rs.on("error", (error) => {
        console.error("An Error Occur:", error.message);
    });
});

server.listen(3000, "127.0.0.1", () => {
    console.log("Server is started.");
});
