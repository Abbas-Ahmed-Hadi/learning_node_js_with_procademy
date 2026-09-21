import mongoose from "mongoose";

export default class UsersSchema {
    static #schema;
    
    static get Schema() {
        return UsersSchema.#schema;
    }
    
    static {
       UsersSchema.#schema = new mongoose.Schema({
           userName: {
               type: String,
               require: [true, "User name is required field!"],
               unique: [true, "User name must be unique"],
           },
           password: {
               type: String,
               require: [true, "Password is required field!"]
           }
       });
    }
}