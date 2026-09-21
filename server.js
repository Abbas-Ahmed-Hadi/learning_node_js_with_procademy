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

app.listen(SERVER_PORT, HOST_NAME, () => {
    console.log("Server Is Started.");
});