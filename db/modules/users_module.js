import mongoose from "mongoose";
import UsersSchema from "./../schemas/users_schema.js";

export default class UsersModule {
    static #Module;

    static {
        UsersModule.#Module = mongoose
            .model("users", UsersSchema.Schema);
    }

    static get Module() {
        return UsersModule.#Module;
    }
}