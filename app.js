import express from "express";
import morgan from "morgan";
import UsersRouter from "./routers/users_router.js";

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.route(UsersRouter.PathV1, UsersRouter.Route);

export default app;