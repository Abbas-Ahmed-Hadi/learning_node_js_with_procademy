import { ErrorType } from "./Error.js";

class ResponseStatus {
    static fail = "fail";
    static success = "success";
}


class Response {
    static ok(res, data = null) {
        if (!data) {
            res.status(200).json({
                status: ResponseStatus.success,
                code: 200
            });
            return;
        }

        res.status(200).json({
            status: ResponseStatus.success,
            code: 200,
            data: data
        });
    }

    static created(res, data) {
        res.status(201).json({
            status: ResponseStatus.success,
            code: 201,
            data: data
        });
    }

    
    static badRequest(res, error) {
        res.status(401).json({
            status: ResponseStatus.fail,
            code: error.code,
            message: error.description,
            type: ResponseUtilities.errorTypeToString(error.type)
        });
    }
    
    static notFound(res, error) {
        res.status(404).json({
            status: ResponseStatus.fail,
            code: error.code,
            message: error.description,
            type: ResponseUtilities.errorTypeToString(error.type)
        });
    }

    static internalServerError(res, error) {
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


export {
    Response,
    ResponseStatus
}