// 12- Creating Routes in Node.js
import http from "http";
import fs from "fs/promises";

const server = http.createServer(async (req, res) => {
    const path = req.url?.toLowerCase() ?? "";

    console.log("Request path:", path);

    if (path === '/' || path === '/home') {
        const index_html = await fs.readFile("./home.html", "utf-8");

        res.setHeader("Content-Type", "text/html");
        res.statusCode = 200;
        
        res.end(index_html);
    } else if (path === '/home.css') {
        const home_css = await fs.readFile("./home.css", "utf-8");

        res.setHeader("Content-Type", "text/css");
        res.statusCode = 200;

        res.end(home_css);
    }
    else if (path === '/about') {
        const about_html = await fs.readFile("./about.html", "utf-8");

        res.setHeader("Content-Type", "text/html");
        res.statusCode = 200;

        res.end(about_html);
    }
    else if (path === '/about.css') {
        const about_css = await fs.readFile("./about.css", "utf-8");

        res.setHeader("Content-Type", "text/css");
        res.statusCode = 200;

        res.end(about_css);
    }
    else {
        res.setHeader("Content-Type", "text/html");
        res.statusCode = 200;
        res.end("<h1>Default Response</h1>");
    }
});

server.listen(3000, "127.0.0.1", () => {
    console.log("Server is Starting...");
})
