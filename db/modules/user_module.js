import mongoose from "mongoose";
import UserSchema from "./../schemas/user_schema.js";

export default class UserModule {
    static #module;
    
    static {
        UserModule.#module = mongoose
            .model("users", UserSchema.Schema);
    }
    
    static get Module() {
        return UserModule.#module;
    }
}