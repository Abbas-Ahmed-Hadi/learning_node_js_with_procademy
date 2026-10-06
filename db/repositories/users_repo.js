import UsersModule from "./../modules/users_module.js";
import User from "./../../entities/user.js";
import mongoose from "mongoose";

export default class UsersRepository {
    constructor() { }
    
    async getAllUsers() {
        try {
            const allUsers = await UsersModule.Module
                .find()
                .select("-__v -password -confirmPassword");

            const users = allUsers.map(u => {
                return {
                    id: u._id.toString(),
                    name: u.name,
                    email: u.email
                };
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
                .findById(userId)
                .select("-__v -password -confirmPassword");
            
            return {
                id: user._id.toString(),
                name: user.name,
                email: user.email
            };
            
        } catch (err) {
            console.log("An Error Occure:", err.message);
            return null;
        }
    }

    async addUser(user) {
        try {
            const newUser = {
                name: user.name,
                email: user.email,
                password: user.password,
                confirmPassword: user.confirmPassword
            };
            
            if (user.photo) { newUser.photo = user.photo; }
            
            const newUserDoc = await UsersModule.Module
                .create(newUser);

            return {
                id: newUserDoc._id.toString(),
                name: newUserDoc.name,
                email: newUserDoc.email,
                photo: newUserDoc.photo
            };
        } catch (err) {
            console.log("An Error Occure:", err.message);
            return null;
        }
    }
    
    async updateUserById(id, user) {
        try {
            const userId = new mongoose.Types.ObjectId(id);
            
            const userToUpdate = {
                name: user.name,
                email: user.email,
                password: user.password,
                confirmPassword: user.confirmPassword
            };
            
            if (user.photo) { userToUpdate.photo = user.photo; }
            
            const updatedUserDoc = await UsersModule.Module
                .findByIdAndUpdate(
                    userId,
                    userToUpdate,
                    {
                        new: true,
                        runValidators: true
                    });
            
            return {
                id: updatedUserDoc._id.toString(),
                name: updatedUserDoc.name,
                email: updatedUserDoc.email,
                photo: updatedUserDoc.photo
            };
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