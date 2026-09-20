import { ErrorType } from "./error.js";
import ValidationErrors from "./validation_errors.js";

export class ResponseStatus {
    static fail = "fail";
    static success = "success";
}


export default class Response {
    static OK(res, data = null) {
        if (!data) {
            res.status(200).json({
                status: ResponseStatus.success,
                code: 200
            });
        } else {
            res.status(200).json({
                status: ResponseStatus.success,
                code: 200,
                data: data
            });
        }
    }

    static Created(res, data) {
        res.status(201).json({
            status: ResponseStatus.success,
            code: 201,
            data: data
        });
    }

    static ValidationFailure(res, errors) {        
        const validationErrors = new ValidationErrors(errors);
        
        res.status(400).json({
            status: ResponseStatus.fail,
            code: validationErrors.code,
            description: validationErrors.description,
            errors: validationErrors.errors,
            type: ResponseUtilities.errorTypeToString(validationErrors.type)
        });
    }

    static BadRequest(res, error) {
        res.status(400).json({
            status: ResponseStatus.fail,
            code: error.code,
            message: error.description,
            type: ResponseUtilities.errorTypeToString(error.type)
        });
    }

    static NotFound(res, error) {
        res.status(404).json({
            status: ResponseStatus.fail,
            code: error.code,
            message: error.description,
            type: ResponseUtilities.errorTypeToString(error.type)
        });
    }

    static Conflict(res, error) {
        res.status(409).json({
            status: ResponseStatus.fail,
            code: error.code,
            message: error.description,
            type: ResponseUtilities.errorTypeToString(error.type)
        });
    }

    static InternalServerError(res, error) {
        res.status(500).json({
            status: ResponseStatus.fail,
            code: error.code,
            message: error.description,
            type: ResponseUtilities.errorTypeToString(error.type)
        });
    }
}


class ResponseUtilities {
    static errorTypeToString(errorType) {
        switch (errorType) {
            case ErrorType.Failure:
                return "Failure";

            case ErrorType.Validation:
                return "Validation";

            case ErrorType.Problem:
                return "Problem";

            case ErrorType.NotFound:
                return "NotFound";

            case ErrorType.Conflict:
                return "Conflict";
        }
    }
}