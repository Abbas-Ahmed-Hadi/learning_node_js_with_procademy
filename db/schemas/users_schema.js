import mongoose from "mongoose";

export default class UsersSchema {
    static #schema;
    
    static get Schema() {
        return UsersSchema.#schema;
    }
    
    static {
       UsersSchema.#schema = new mongoose.Schema({
           Name: {
               type: String,
               require: [true, "Name is required field!"],
               unique: [true, "Name must be unique"],
           },
           email: {
               type: String,
               require: [true, "Email is required field!"],
               unique: [true, "Email must be unique"]
           },
           photo: String,
           password: {
               type: String,
               require: [true, "Password is required field!"]
           },
           confirmPassword: {
               type: String,
               require: [true, "Confirm password is require field!"]
           }
       });
    }
}