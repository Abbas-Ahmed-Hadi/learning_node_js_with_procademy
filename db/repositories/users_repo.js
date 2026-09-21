import UsersModule from "./../modules/users_module.js";
import User from "./../../entities/user.js";
import mongoose from "mongoose";

export default class UsersRepository {
    constructor() { }
    
    async getAllUsers() {
        try {
            const allUsers = await UsersModule.Module.find();

            const users = allUsers.map(u => {
                return new User(
                    u._id.toString(),
                    u.userName,
                    u.password);
            });
            
            return users;
        } catch (err) {
            console.log("An Error Occure:", err.message);
            return [];
        }
    }
    
    async getUserById(id) {
        try {
            const userId = new mongoose.Types.ObjectId(id);
            
            const user = await UsersModule.Module
                .findById(userId);
            
            return new User(
                user._id.toString(),
                user.userName,
                user.password
            );
        } catch (err) {
            console.log("An Error Occure:", err.message);
            return null;
        }
    }

    async addUser(user) {
        try {
            const newUserDoc = await UsersModule.Module
                .create({
                    userName: user.userName,
                    password: user.password
                });

            return new User(
                newUserDoc._id.toString(),
                newUserDoc.userName,
                newUserDoc.password);

        } catch (err) {
            console.log("An Error Occure:", err.message);
            return null;
        }
    }
    
    async updateUserById(id, user) {
        try {
            const userId = new mongoose.Types.ObjectId(id);
            
            const updatedUser = await UsersModule.Module
                .findByIdAndUpdate(userId, {
                    userName: user.userName,
                    password: user.password
                }, {
                    new: true,
                    runValidators: true
                });
            
            return new User(
                updatedUser._id.toString(),
                updatedUser.userName,
                updatedUser.password
            );
        } catch (err) {
            console.log("An Error Occure:", err.message);
            return null;
        }
    }
    
    async deleteUserById(id) {
        try {
            const userId = new mongoose.Types.ObjectId(id);
            
            const userToDelete = await UsersModule.Module
                .findByIdAndDelete(userId);
            
            return Boolean(userToDelete);
        } catch (err) {
            console.log("An Error Occure:", err.message);
            return false;
        }
    }
}