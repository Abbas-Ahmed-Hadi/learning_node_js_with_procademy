import NormalizedError from "./normalized_error.js";
import { Error, ErrorType } from "./error.js";

export default class ValidatorExtensions {
    static NormalizeError(error, fieldName = "") {
        if (error instanceof Error) {
            return NormalizedError
                .FromError(fieldName, error);
        }
        
        if (typeof error === "string") {
            return new NormalizedError(
                fieldName,
                "General.Error",
                error,
                ErrorType.Failure)
        }
        
        throw new Exception("Invalid validation error format");
    }

    static ToArrayOfNormalizeErrors(errors, filedName = "") {
        if (!Array.isArray(errors) || errors.length === 0) {
            throw new Exception("Invalid state, errors must be provided");
        }

        return errors.map(err => {
            return ValidatorExtensions.NormalizeError(err, filedName)
        });
    }
    
        
    static FormatError(error, fieldName = "") {
        if (typeof error === "string") {
            return {
                field: fieldName,
                message: error
            };
        }
        
        if (error &&
            typeof fieldName === "string" &&
            typeof error.message === "string"
        ) {
            return {
                field: error.field ? error.field : fieldName,
                message: error.message
            };
        }

        throw new Exception("Invalid validation error format");
    }

    static FormatArrayOfErrors(errors, filedName = "") {
        if (!Array.isArray(errors) || errors.length === 0) {
            throw new Exception("Invalid state, errors must be provided");
        }

        return errors.map(err => {
            return ValidatorExtensions.FormatError(err, filedName)
        });
    }
}