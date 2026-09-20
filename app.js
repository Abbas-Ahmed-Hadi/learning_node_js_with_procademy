import express from "express";
import morgan from "morgan";
import UsersRouter from "./routers/users_router.js";
import MoviesRouter from "./routers/movies_router.js";

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(UsersRouter.PathV1, UsersRouter.Router);
app.use(MoviesRouter.PathV1, MoviesRouter.Router);

export default app;