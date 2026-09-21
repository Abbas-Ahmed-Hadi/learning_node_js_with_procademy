import mongoose from "mongoose";

export default class UserSchema {
    static #schema;
    
    static get Schema() {
        return UserSchema.#schema;
    }
    
    static {
       UserSchema.#schema = new mongoose.Schema({
           userName: {
               type: String,
               require: [true, "User name is required"],
               unique: [true, "User name must be unique"],
           },
           password: {
               type: String,
               require: [true, "Password is required"]
           }
       });
    }
}