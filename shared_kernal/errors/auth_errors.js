import { Error, ErrorType } from "./error.js";

export default class AuthErrors {
    
    static SingUpFailure(email) {
        return new Error(
            "Auth.SingUpOperationFailed",
            `Failed to sing up with email: '${email}'`,
            ErrorType.Failure);
    }
    
    static LoginWithEmailFailure(email) {
        return new Error(
            "Auth.LogInOperationFailed",
            `Failed to log in with email: '${email}'`,
            ErrorType.Failure);
    }
}