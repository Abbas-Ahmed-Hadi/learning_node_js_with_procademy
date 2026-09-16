import express from "express";
import UsersEndPoints from "../api_endpoints/users_endpoints.js";
import StringUtilities from "../utilities/string_utilities.js";

export default class UsersRouterInfo {
    static #usersRouter = null;

    static InitRounter() {
        this.#usersRouter = express.Router();

        this.#usersRouter.param("id", 
            UsersEndpointsValidator.validateUserIdParam);

        this.#usersRouter.route("/")
            .get(UsersEndPoints.getAllUsers)
            .post(UsersEndpointsValidator.validateUserRequestBody, 
                UsersEndPoints.addUser);

        this.#usersRouter.route("/:id")
            .get(UsersEndPoints.getUser)
            .put(UsersEndpointsValidator.validateUserRequestBody, 
                UsersEndPoints.updateUser)
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

class UsersEndpointsValidator {
    static validateUserIdParam(req, res, next, value) {
        const userId = Number.parseInt(value);

        if (Number.isNaN(userId)) {
            res.status(401).json({
                status: "fail",
                code: "User.InvalidID",
                message: "Invalid user id",
                type: "ErrorType.Validation"
            });
            return;
        }

        if (userId < 1) {
            res.status(401).json({
                status: "fail",
                code: "User.InvalidID",
                message: "User Id must not be zero or nagative",
                type: "ErrorType.Validation"
            });
            return;
        }

        next();
    }
    
    static validateUserRequestBody(req, res, next) {
        const userName = req.body.userName;
        const password = req.body.password;
        
        const isUserNameNotValid = StringUtilities.isNullOrWhiteSpace(userName);
        const isPasswordNotValid = StringUtilities.isNullOrWhiteSpace(password);
        
        
        
        if (isUserNameNotValid || isPasswordNotValid) {
            return Response.badRequest(res, 
                new Error(
                    "User.InvalidData",
                    "Invalid user data",
                    ErrorType.Validation));
        }
        
        next();
    }
}
