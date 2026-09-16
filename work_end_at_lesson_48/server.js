import { SERVER_PORT, HOST_NAME } from "./config.js";
import app from "./app.js";

app.listen(SERVER_PORT, HOST_NAME, () => {
    console.log("Server is Started.");
});
