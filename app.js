import express from "express";
import logger from "./middlewares/logger.js";
import morgan from "morgan";
import UsersRouterInfo from "./routers/users_router.js";

// App initialization.
const app = express();

UsersRouterInfo.InitRounter();


// Middlewares Utility.
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

app.use(UsersRouterInfo.PathV1, UsersRouterInfo.Router);


// Start up.
const PORT = 3000;
const HOST_NAME = "127.0.0.1";
app.listen(PORT, HOST_NAME, () => {
    console.log("Server is Started.");
});

