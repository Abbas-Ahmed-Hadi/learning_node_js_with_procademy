import express from "express";
import logger from "./middlewares/logger.js";
import UsersEndPoints from "./api_endpoints/users.js";

const app = express();

app.use(express.json());
app.use(logger);

// app.route("/api/v1/users")
//     .get(getAllUsers)
//     .post(addUser);

// app.route("/api/v1/users/:id")
//     .put(updateUser)
//     .get(getUser)
//     .delete(deleteUser);

app.route("/api/v1/users")
    .get(UsersEndPoints.getAllUsers)
    .post(UsersEndPoints.addUser);

app.route("/api/v1/users/:id")
    .put(UsersEndPoints.updateUser)
    .get(UsersEndPoints.getUser)
    .delete(UsersEndPoints.deleteUser);

const PORT = 3000;
const HOST_NAME = "127.0.0.1";
app.listen(PORT, HOST_NAME, () => {
    console.log("Server is Started.");
});
