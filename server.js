import { app } from "./app.js";

const PORT = 3000;
const HOST_NAME = "127.0.0.1";

app.listen(PORT, HOST_NAME, () => {
    console.log("Server is Started.");
});
