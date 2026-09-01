// 8- Createing A Simple Web Server
import http from "http";

var conutOfRequests = 0;

const server = http.createServer((req, res) => {
    conutOfRequests += 1;
    // console.log("Request is received:", conutOfRequests);
    console.log(
        "Request:",
        conutOfRequests,
        req.method,
        req.url
    );
    
    res.writeHead(200, {
        // 'Content-Type': "application/json"
        'Content-Type': "text/html"
    });
    
    // res.end(JSON.stringify({
    //     data: "Hello, World!"
    // }));
    
    res.end("<h1>This is The Home Page</h1>")
});


server.listen(3000, "127.0.0.1", () => {
    console.log("Server Is Started.\n");
});

console.log("Program Is Started.");
