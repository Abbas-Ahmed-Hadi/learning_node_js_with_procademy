import { PORT, HOST_NAME } from "./config.js";
import app from "./app.js";

app.listen(PORT, HOST_NAME, () => {
  console.log("Server is Started.");
});
