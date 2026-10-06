import express from "express";
import AuthController from "./../controllers/auth_controller.js";

export default class AuthRouter {
    
    static #router;
    
    static {
        AuthRouter.#router = express.Router();
        
        AuthRouter.#router.route("/singup")
            .post(AuthController.singUp);
        
        AuthRouter.#router.route("/login")
            .post(AuthController.logIn);
    }
    
    static get Router() {
        if (!AuthRouter.#router) {
            throw new Exception("Auth router must not be null.")
        }
        
        return AuthRouter.#router;
    }
    
    static get PathV1() {
        return "/api/v1/auth";
    }
}