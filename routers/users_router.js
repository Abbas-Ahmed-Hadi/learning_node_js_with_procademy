import express from "express";
import UserController from "./../controllers/user_controller.js";
import Response from "./../shared_kernal/response.js";
import { Error, ErrorType } from "./../shared_kernal/error.js";
// import ValidationErrors from "./../shared_kernal/validation_errors.js";
import UsersError from "./../shared_kernal/users_error.js";
import Validator from "./../shared_kernal/validator.js";

export default class UsersRouter {
    #router;

    static() {
        this.#router = express.Router();

        this.#router.route('/')
            .get(UserController.getAllUsers)
            .post(UserEndpointValidator.ValidateUserRequestBody,
                UserController.addUser);

        this.#router.param("id",
            UserEndpointValidator.ValidateUserIdParam);

        this.#router.route("/:id")
            .get(UserController.getUserById)
            .put(UserEndpointValidator.ValidateUserRequestBody,
                UserController.updateUserById)
            .delete(UserController.deleteUserById);
    }

    get Router() {
        if (!this.#router) {
            throw new Exception("Users router must not be null.")
        }

        return this.#router;
    }

    get PathV1() {
        return "/api/v1/users";
    }
}

class UserEndpointValidator {
    static ValidateUserIdParam(_, res, next, value) {
        const userId = Number.parseInt(value);

        if (Number.isNaN(userId)) {
            return Response.BadRequest(res,
                new Error(
                    "Users.InvalidId",
                    "User Id must be number.",
                    ErrorType.Validation));
        }

        if (userId < 1) {
            return Response.BadRequest(res,
                UsersError.InvalidId(userId));
        }

        next();
    }

    static ValidateUserRequestBody(req, res, next) {
        const userName = req.body.userName;
        const password = req.body.password;

        const userNameErrors = Validator.ValidateString(
            userName, "User name", 5, 20);

        const passwordErrors = Validator.ValidateString(
            password, "Password", 8, 30);

        if (userNameErrors.length !== 0 ||
            passwordErrors.length !== 0) {

            const validationErrors =
            // new ValidationErrors(
            {
                ...userNameErrors,
                ...passwordErrors
            }
            // );

            console.log("ValidationUserRequestBody:\n  - ValidationErrors:", validationErrors)

            return Response
                .ValidationFailure(res, validationErrors);
        }

        next();
    }
}