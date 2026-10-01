import express from "express";
import morgan from "morgan";
import UsersRouter from "./routers/users_router.js";
import MoviesRouter from "./routers/movies_router.js";
import Response from "./shared_kernal/response.js";
import { Error, ErrorType } from "./shared_kernal/error.js";

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(UsersRouter.PathV1, UsersRouter.Router);
app.use(MoviesRouter.PathV1, MoviesRouter.Router);

app.all('/{*splat}', (req, res, next) => {
    Response.NotFound(res, new Error(
        "APIs.UrlNotFound",
        `Can't find '${req.originalUrl}' url on the server`,
        ErrorType.NotFound));
    
    next();
});

export default app;