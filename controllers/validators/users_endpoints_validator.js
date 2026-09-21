import Response from "./../../shared_kernal/response.js";
import UsersErrors from "./../../shared_kernal/users_errors.js";
import Validator from "./../../shared_kernal/validator.js";
import ValidatorExtensions from "./../../shared_kernal/validator_extensions.js";

export default class UsersEndpointsValidator {
    
    static ValidateUserRequestBody(req, res, next) {
        const userName = req.body.userName;
        const password = req.body.password;

        let validationErrors = new Array(0);
        
        const userNameErrors = Validator.ValidateString(
            userName, "User name", 5, 20);

        if (userNameErrors.length !== 0) {
            const errors = ValidatorExtensions
                .FormatArrayOfErrors(userNameErrors, "User Name");
            
            validationErrors = validationErrors.concat(errors);
        }
        
        const passwordErrors = Validator.ValidateString(
            password, "Password", 8, 30);
        
        if (passwordErrors.length !== 0) {
            const errors = ValidatorExtensions
                .FormatArrayOfErrors(passwordErrors, "Password");
            
            validationErrors = validationErrors.concat(errors);
        }

        if (validationErrors.length !== 0) {
            return Response
                .ValidationFailure(res, validationErrors);
        }
        
        next();
    }
    
    static ValidateUserIdParam(_, res, next, value) {
        if (typeof value !== "string" ||
            value.length !== 24) {
            return Response
                .BadRequest(res, UsersErrors.InvalidId(userId));
        }

        next();
    }
}