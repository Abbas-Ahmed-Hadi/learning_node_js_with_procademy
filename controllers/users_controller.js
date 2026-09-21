import UsersServices from "./../services/users_services.js";
import User from "./../entities/user.js";
import Response from "./../shared_kernal/response.js";
import { ErrorType } from "./../shared_kernal/error.js";

export default class UsersController {
    static async getAllUsers(_, res) {
        const result = await UsersServices.getAllUsers();

        return result.isFailure
            ? Response.NotFound(res, result.error)
            : Response.OK(res, {
                count: result.value.length,
                users: result.value
            });
    }

    static async getUserById(req, res) {
        const userId = req.params.id;

        const result = await UsersServices.getUserById(userId);

        return result.isFailure
            ? result.error.type === ErrorType.NotFound
                ? Response.NotFound(res, result.error)
                : Response.InternalServerError(res, result.error)
            : Response.OK(res, result.value);
    }

    static async addUser(req, res) {
        const user = new User(
            null,
            req.body.userName,
            req.body.password);

        const result = await UsersServices.addUser(user);

        return result.isFailure
            ? result.error.type === ErrorType.Conflict
                ? Response.Conflict(res, result.error)
                : Response.BadRequest(res, result.error)
            : Response.Created(res, result.value);
    }

    static async updateUserById(req, res) {
        const userId = req.params.id;

        const user = new User(
            userId, 
            req.body.userName,
            req.body.password);

        const result = await UsersServices.updateUserById(userId, user);

        return result.isFailure
            ? result.error.type === ErrorType.NotFound
                ? Response.NotFound(res, result.error)
                : Response.InternalServerError(res, result.error)
            : Response.OK(res, result.value);
    }

    static async deleteUserById(req, res) {
        const userId = req.params.id;

        const result = await UsersServices.deleteUserById(userId);

        return result.isFailure
            ? result.error.type === ErrorType.NotFound
                ? Response.NotFound(res, result.error)
                : Response.InternalServerError(res, result.error)
            : Response.OK(res);
    }
}