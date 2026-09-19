import { SERVER_PORT, HOST_NAME, DB_CONN_STR } from "./config.js";
import mongoose from "mongoose";
import app from "./app.js";

mongoose.connect(DB_CONN_STR)
    .then(_ => {
        console.log("Connection To MongoDB Server Is Successed.");
    })
    .catch(err => {
        console.log("Connection To MongoDB Server Is Failed.");
        console.log("An Error Occur:", err.message);
    });

app.listen(SERVER_PORT, HOST_NAME, () => {
    console.log("Server Is Started.");
});