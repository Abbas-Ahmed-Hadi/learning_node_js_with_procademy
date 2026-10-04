process.on("uncaughtException", (err) => {
    console.log("Error:");
    console.log("   - name:", err.name);
    console.log("   - message:", err.message);
    
    console.log("Unhandled Exception Occured: Server is shutting down...");
    
    process.exit(1);
});


import { SERVER_PORT, HOST_NAME, DB_CONN_STR, NODE_ENV } from "./config.js";
import mongoose from "mongoose";
import app from "./app.js";

mongoose.connect(DB_CONN_STR)
    .then(() => {
        if (NODE_ENV === "development") {
            console.log("Conncetion To MongoDB Is Successed.");
        }
    })
    .catch((err) => {
        console.log("Conncetion To MongoDB Is Failed.");
        console.log("An Error Occur:", err.message);
    });

const server = app.listen(SERVER_PORT, HOST_NAME, () => {
    console.log("Server Is Started.");
});


process.on("unhandledRejection", (err) => {
    console.log("Error:");
    console.log("   - name:", err.name);
    console.log("   - message:", err.message);
    
    console.log("\nUnhandled Rejection Promise Occured: Server is shutting down...");
    
    server.close(() => {
        console.log("Server Is Shutdown");
        process.exit(1);
    });
});