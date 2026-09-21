import { Error, ErrorType } from "./error.js";

export default class UsersErrors {
    
    static #NotFound = new Error(
        "Users.NotFound",
        "User not found", 
        ErrorType.NotFound);
        
    static get NotFound() {
        return UsersErrors.#NotFound;
    }
    
    static NotFoundById(id) {
        return new Error(
            "Users.NotFoundById",
            `User with id: '${id}' is not found`, 
            ErrorType.NotFound);
    }
        
    static CreationFailure(user) {
        return new Error(
            "Users.CreationFailure",
            `User with user name: ${user.userName} is not created`, 
            ErrorType.Problem);
    }
    
    static InvalidId(id) {
        return new Error(
            "Users.InvalidId",
            `Invalid user id: '${id}'`,
            ErrorType.Validation);
    }
}