import { DB_CONN_STR, SERVER_PORT, HOST_NAME } from "./config.js";
import app from "./app.js";
import mongoose from "mongoose";


mongoose.connect(DB_CONN_STR) //, { useNewUrlParser: true })
.then((/* conn */) => {
    // console.log("Connection:", conn);
    console.log("\nDB Connection String:", DB_CONN_STR);
    console.log("Connection to Database Successfully.\n");
})
.catch((err) => {
    console.log("An Error Occur:", err.message);
});


app.listen(SERVER_PORT, HOST_NAME, () => {
    console.log("Server is Started.");
});
