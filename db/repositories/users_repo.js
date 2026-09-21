import mongoose from "mongoose";
import { DB_CONN_STR } from "./../../config.js";
import UserModule from "./../modules/user_module.js";
import User from "./../../entities/user.js";

export default class UserRepository {
    #mongoose;
    
    constructor () {}
    
    async connect() {
        this.#mongoose = await mongoose.connect(DB_CONN_STR);
    }
    
    async getAllUsers() {
        
    }
    
    async addUser(user) {
        const userModule = UserModule.Module;
        
        const newUserFromModule = new userModule({
            userName: user.userName,
            password: user.password
        });
        
        try {
            const newUserFromDB = await newUserFromModule.save();
            
            const newUser = new User(
                newUserFromDB._id.toString(),
                newUserFromDB.userName,
                newUserFromDB.password);

            return newUser;
        } catch (err) {
            console.log("Error Occure:", err.message);
            return null;
        }
    }
}