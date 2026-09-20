import express from "express";
import morgan from "morgan";
import UsersRouter from "./routers/users_router.js";

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// console.log();
// console.log("Used Router:", UsersRouter.Router);
// console.log();

app.use(UsersRouter.PathV1, UsersRouter.Router);

export default app;