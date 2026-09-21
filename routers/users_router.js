import express from "express";
import UsersController from "./../controllers/users_controller.js";
import UserEndpointValidator from "./../controllers/validators/users_endpoints_validator.js"

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