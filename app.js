import express from "express";
import logger from "./middlewares/logger.js";
import morgan from "morgan";
import UsersRouterInfo from "./routers/users_router.js";

// App initialization.
const app = express();

// Initialize Routers
UsersRouterInfo.InitRounter();


// Middlewares Utility.
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("./public"));
app.use(logger);

app.use(UsersRouterInfo.PathV1, UsersRouterInfo.Router);


export {
    app
}
