import express from "express";
import UsersEndPoints from "../api_endpoints/users/users_endpoints.js";

export default class UsersRouterInfo {
    static #usersRouter = null;

    static InitRounter() {
        this.#usersRouter = express.Router();

        this.#usersRouter.route("/")
            .get(UsersEndPoints.getAllUsers)
            .post(UsersEndPoints.addUser);

        this.#usersRouter.route("/:id")
            .put(UsersEndPoints.updateUser)
            .get(UsersEndPoints.getUser)
            .delete(UsersEndPoints.deleteUser);
    }

    static get Router() {
        if (this.#usersRouter === null) {
            throw new Exception(
                "The router must not be null");
        }

        return this.#usersRouter;
    }

    static get PathV1() {
        return "/api/v1/users";
    }
}
