import { Error, ErrorType } from "./error.js";

export default class UserErrors {
    
    static #NotFound = new Error(
        "Users.NotFound",
        "User not found", 
        ErrorType.NotFound);
        
    static get NotFound() {
        return UserErrors.#NotFound;
    }
        
    static CreationFailure(user) {
        return new Error(
            "User.CreationFailure",
            `User with user name: ${user.userName} is not created`, 
            ErrorType.Problem);
    }
    
    static InvalidId(id) {
        return new Error(
            "Users.InvalidId",
            `Invalid user id= '${id}'`,
            ErrorType.Validation);
    }
}