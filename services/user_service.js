import { ResultOnly, ResultWithValue } from "./../shared_kernal/result.js";
import UserErrors from "./../shared_kernal/user_errors.js";
import { Error, ErrorType } from "./../shared_kernal/error.js";
import User from "./../entities/user.js";

export default class UserService {
    static #users = new Array(0);
    
    static() {
        for (let i = 1; i < 11; i++) {
            UserService.#users.push(new User({
                id: i,
                userName: `User Name ${i}`,
                password: `password ${i}`
            }));
        }
    }
    
    static getAllUsers() {
        return !UserService.#users || UserService.#users.length === 0
            ? ResultOnly.Failure(new Error(
                "Users.NoUserFound",
                "There is no user",
                ErrorType.NotFound))
            : ResultWithValue.Success(UserService.#users);
    }
    
    static getUserById(id) {
        const user = UserService.#users.find(u => u.id === id);
        
        if (!user) {
            return ResultOnly.Failure(UserErrors.NotFound);
        }
        
        return ResultWithValue.Success(user);
    }
    
    static addUser(user) {
        const newUser = UserService.#users.push(user);
        
        return !newUser
            ? ResultOnly.Failure(UserErrors.CreationFailure(user))
            : ResultWithValue.Success(newUser);
    }
    
    static updateUserById(id, user) {
        const userToUpdate = UserService.#users.find(u => u.id === id);
    
        if (!userToUpdate) {
            return ResultOnly.Failure(UserErrors.NotFound);
        }
        
        u.userName = user.userName;
        u.password = user.password;
        
        ResultOnly.Success();
    }
    
    static deleteUserById(id) {
        const userToDeleteIndex = UserService.#users.findIndex(u => u.id === id);
    
        if (userToDeleteIndex === -1) {
            return ResultOnly.Failure(UserErrors.NotFound);
        }
        
        UserService.#users.splice(userToDeleteIndex, 1);
        
        ResultOnly.Success();
    }
}