import AuthServices from "./../services/auth_services.js";
import Response from "./../shared_kernal/response.js";
import { Error, ErrorType } from "./../shared_kernal/errors/error.js";

export default class AuthController {
    
    static async singUp(req, res) {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const photo = req.body.photo;
        
        const userInfo = {
            name, email, password, confirmPassword, photo
        }
        
        const result = await AuthServices.SingUp(userInfo);
        
        return result.IsFailure
            ? result.error.type === ErrorType.AuthServices
                ? Response.BadRequest(res, result.error)
                : Response.InternalServerError(res, result.error)
            : Response.NoContent(res);
    }
    
    static async logIn(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        
        const result = await AuthServices.LogIn(email, password);
        
        return result.IsFailure
            ? result.error.type === ErrorType.AuthServices
                ? Response.BadRequest(res, result.error)
                : Response.InternalServerError(res, result.error)
            : Response.NoContent(res);
    }
}