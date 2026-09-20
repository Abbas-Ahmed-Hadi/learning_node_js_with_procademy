import express from "express";
import UsersController from "./../controllers/users_controller.js";
import Response from "./../shared_kernal/response.js";
import { Error, ErrorType } from "./../shared_kernal/error.js";
import UserErrors from "./../shared_kernal/user_errors.js";
import Validator from "./../shared_kernal/validator.js";
import ValidatorExtensions from "./../shared_kernal/validator_extensions.js";

class UserEndpointValidator {
    static ValidateUserIdParam(_, res, next, value) {
        const userId = Number.parseInt(value);

        if (Number.isNaN(userId)) {
            return Response.BadRequest(res,
                new Error(
                    "Users.InvalidId",
                    "User Id must be number",
                    ErrorType.Validation));
        }

        if (userId < 1) {
            return Response.BadRequest(res,
                UserErrors.InvalidId(userId));
        }

        next();
    }

    static ValidateUserRequestBody(req, res, next) {
        const userName = req.body.userName;
        const password = req.body.password;

        let validationErrors = new Array(0);
        
        const userNameErrors = Validator.ValidateString(
            userName, "User name", 5, 20);

        if (userNameErrors.length !== 0) {
            const errors = ValidatorExtensions
                .FormatArrayOfErrors(userNameErrors, "User Name");
            
            validationErrors = validationErrors.concat(errors);
        }
        
        const passwordErrors = Validator.ValidateString(
            password, "Password", 8, 30);
        
        if (passwordErrors.length !== 0) {
            const errors = ValidatorExtensions
                .FormatArrayOfErrors(passwordErrors, "Password");
            
            validationErrors = validationErrors.concat(errors);
        }

        if (validationErrors.length !== 0) {
            return Response
                .ValidationFailure(res, validationErrors);
        }
        
        next();
    }
}


export default class UsersRouter {
    
    static #router;

    static {
        UsersRouter.#router = express.Router();

        UsersRouter.#router.route('/')
            .get(UsersController.getAllUsers)
            .post(UserEndpointValidator.ValidateUserRequestBody,
                UsersController.addUser);

        UsersRouter.#router.param("id",
            UserEndpointValidator.ValidateUserIdParam);

        UsersRouter.#router.route("/:id")
            .get(UsersController.getUserById)
            .put(UserEndpointValidator.ValidateUserRequestBody,
                UsersController.updateUserById)
            .delete(UsersController.deleteUserById);
    }

    static get Router() {
        if (!UsersRouter.#router) {
            throw new Exception("Users router must be provided.");
        }

        return UsersRouter.#router;
    }

    static get PathV1() {
        return "/api/v1/users";
    }
}