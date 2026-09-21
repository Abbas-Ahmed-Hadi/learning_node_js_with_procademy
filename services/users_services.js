import UsersRepository from "./../db/repositories/users_repo.js";
import { ResultOnly, ResultWithValue } from "./../shared_kernal/result.js";
import { Error, ErrorType } from "./../shared_kernal/error.js";
import UsersErrors from "./../shared_kernal/users_errors.js";

export default class UsersServices {
    
    static async getAllUsers() {
        const userRepo = new UsersRepository();
        const users = await userRepo.getAllUsers();
        
        return !users || users.length === 0
            ? ResultOnly.Failure(new Error(
                "Users.NoUserFound",
                "There is no user",
                ErrorType.NotFound))
            : ResultWithValue.Success(users);
    }
    
    static async getUserById(id) {
        const userRepo = new UsersRepository();
        const user = await userRepo.getUserById(id);
        
        return !user
            ? ResultOnly.Failure(UsersErrors.NotFoundById(id))
            : ResultWithValue.Success(user);
    }
    
    static async addUser(user) {
        const userRepo = new UsersRepository();
        const newUser = await userRepo.addUser(user);

        return !newUser
            ? ResultOnly.Failure(UsersErrors.CreationFailure(user))
            : ResultWithValue.Success(newUser);
    }
    
    static async updateUserById(id, user) {
        const userRepo = new UsersRepository();
        const updatedUser = await userRepo.updateUserById(id, user);
        
        return !updatedUser
            ? ResultOnly.Failure(UsersErrors.NotFoundById(id))
            : ResultWithValue.Success(user);
    }
    
    static async deleteUserById(id) {
        const userRepo = new UsersRepository();
        const isUserDeleted = await userRepo.deleteUserById(id);
        
        return isUserDeleted
            ? ResultOnly.Success()
            : ResultOnly.Failure(UsersErrors.NotFoundById(id));
    }
}