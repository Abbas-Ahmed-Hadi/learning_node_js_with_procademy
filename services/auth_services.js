import AuthRepository from "./../db/repositories/auth_repo.js";
import { ResultOnly, ResultWithValue } from "./../shared_kernal/result.js";
import AuthErrors from "./../shared_kernal/errors/auth_errors.js";


export default class AuthServices {
    
    static async SingUp(userInfo) {
        const authRepo = new AuthRepository();
        const userData = await authRepo.singUp(userInfo);
        
        return !userData
            ? ResultOnly.Failure(AuthErrors
                .SingUpFailure(userInfo.email))
            : ResultWithValue.Success(userData);
    }
    
    
    static async LogIn(email, password) {
        const authRepo = new AuthRepository();
        const userData = await authRepo.logIn(email, password);
        
        return !userData
            ? ResultOnly.Failure(AuthErrors
                .LoginWithEmailFailure(email))
            : ResultWithValue.Success(userData);
    }
}