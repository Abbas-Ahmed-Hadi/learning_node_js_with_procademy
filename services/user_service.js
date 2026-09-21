import { ResultOnly, ResultWithValue } from "./../shared_kernal/result.js";
import UserErrors from "./../shared_kernal/user_errors.js";
import { Error, ErrorType } from "./../shared_kernal/error.js";
import User from "./../entities/user.js";

import UserRepository from "./../db/repositories/users_repo.js";

export default class UserServices {
    static #users = new Array(0);
    static #latestUserId = 10;
    
    static #getNewId() {
        return ++UserServices.#latestUserId;
    }
    
    static {
        for (let i = 1; i <= UserServices.#latestUserId; i++) {
            UserServices.#users.push(new User(
                i,
                `User Name ${i}`,
                `password ${i}`));
        }
    }
    
    static getAllUsers() {
        return !UserServices.#users || UserServices.#users.length === 0
            ? ResultOnly.Failure(new Error(
                "Users.NoUserFound",
                "There is no user",
                ErrorType.NotFound))
            : ResultWithValue.Success(UserServices.#users);
    }
    
    static getUserById(id) {
        const user = UserServices.#users.find(u => u.id === id);
        
        if (!user) {
            return ResultOnly.Failure(UserErrors.NotFound);
        }
        
        return ResultWithValue.Success(user);
    }
    
    static async addUser(user) {
        const newUser = new User(
            UserServices.#getNewId(), 
            user.userName, 
            user.password);
        
        //UserServices.#users.push(newUser);
        const userRepo = new UserRepository();
        
        await userRepo.connect();
        const newUserFromDB = await userRepo.addUser(newUser);
        
        console.log("UserServices.addUser:")
        console.log("  - newUserFromDB:", newUserFromDB)
        
        return !newUserFromDB
            ? ResultOnly.Failure(UserErrors.CreationFailure(user))
            : ResultWithValue.Success(newUser);
    }
    
    static updateUserById(id, user) {
        const userToUpdate = UserServices.#users.find(u => u.id === id);
    
        if (!userToUpdate) {
            return ResultOnly.Failure(UserErrors.NotFound);
        }
        
        userToUpdate.updateFrom(user);

        return ResultWithValue.Success(user);
    }
    
    static deleteUserById(id) {
        const userToDeleteIndex = UserServices.#users.findIndex(u => u.id === id);
    
        if (userToDeleteIndex === -1) {
            return ResultOnly.Failure(UserErrors.NotFound);
        }
        
        UserServices.#users.splice(userToDeleteIndex, 1);
        
        return ResultOnly.Success();
    }
}