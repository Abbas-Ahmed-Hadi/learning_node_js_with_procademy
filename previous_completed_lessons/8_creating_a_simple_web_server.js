// 8- Createing A Simple Web Server
import http from "http";

const server = http.createServer((_, res) => {
    console.log("Request is received");
    
    res.writeHead(200, {
        'Content-Type': "application/json"
    });
    
    res.end(JSON.stringify({
        data: "Hello, World!"
    }));
});


server.listen(3000, "127.0.0.1", () => {
    console.log("Server Is Started.\n");
});

console.log("Program Is Started.");
