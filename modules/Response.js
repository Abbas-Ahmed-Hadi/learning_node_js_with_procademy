import ResponseStatus from "./ResponseStatus.js";

export default class Response {
    static ok(res, data) {
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
    
    static badRequest(res, message = "Invalid Request") {
        res.status(401).json({
            status: ResponseStatus.fail,
            code: 401,
            message: message
        });
    }
    
    static notFound(res, message) {
        res.status(404).json({
            status: ResponseStatus.fail,
            code: 404,
            message: message
        });
    }
    
    static internalServerError(res, message = "Internal server error") {
        res.status(500).json({
            status: ResponseStatus.fail,
            code: 500,
            message: message
        });
    }
}
