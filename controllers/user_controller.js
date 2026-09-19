import UserService from "./../services/user_service.js";
import User from "./../entities/user.js";
import Response from "./../shared_kernal/response.js";
import { ErrorType } from "./../shared_kernal/error.js";

export default class UserController {
    static getAllUsers(_, res) {
        const result = UserService.getAllUsers();

        return result.isFailure
            ? Response.NotFound(res, result.error)
            : Response.OK(res, {
                count: result.value.length,
                users: result.value
            });
    }

    static getUserById(req, res) {
        const userId = req.params.id;

        const result = UserService.getUserById(userId);

        return result.isFailure
            ? Response.NotFound(result.error)
            : Response.OK(res, result.value);
    }

    static addUser(req, res) {
        const user = new User(
            0,
            req.body.userName,
            req.body.password);

        const result = UserService.addUser(user);

        return result.isFailure
            ? result.error.type === ErrorType.NotFound
                ? Response.Conflict(res, result.error)
                : Response.BadRequest(res, result.error)
            : Response.Created(res, result.value);
    }

    static updateUserById(req, res) {
        const user = new User(
            req.params.id,
            req.body.userName,
            req.body.password);

        const result = UserService.updateUserById(user);

        return result.isFailure
            ? result.error.type === ErrorType.NotFound
                ? Response.NotFound(res, result.error)
                : Response.BadRequest(res, result.error)
            : Response.Created(res, result.value);
    }

    static deleteUserById(req, res) {
        const userId = req.params.id;

        const result = UserService.deleteUserById(userId);

        return result.isFailure
            ? Response.NotFound(res, result.error)
            : Response.Created(res, result.value);
    }
}