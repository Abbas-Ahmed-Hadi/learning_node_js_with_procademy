import StringUtlities from "./string_utilities.js";

export default class Validator {
    static ValidateString(
        value,
        filedName,
        minLength,
        maxLength) {
        const errors = new Array(0);

        if (!value) {
            errors.push(`${filedName} must not be null`);
            return errors;
        }

        if (StringUtlities.IsNullOrWhiteSpace(value)) {
            errors.push(`${filedName} must not be empty or white spaces`);
            return errors;
        }

        if (value.length < minLength) {
            errors.push(`${filedName} must be more than ${minLength}`);
        }
        if (value.length > maxLength) {
            errors.push(`${filedName} must be less than ${maxLength}`);
        }

        return errors.map(ValidatorExtension.NormalizeSingleError);
    }
}

export class ValidatorExtension {
    static NormalizeSingleError(error) {
        if (typeof error === "string") {
            return {
                field: "",
                message: error
            };
        }

        if (
            error &&
            typeof error.field === "string" &&
            typeof error.message === "string"
        ) {
            return {
                field: error.field,
                message: error.message
            };
        }

        throw new Exception("Invalid validation error format");
    }
    
    static NormalizeArrayOfErrors(errors) {
        if (!Array.isArray(errors) || errors.length === 0) {
            throw new Exception("Invalid state, errors must be provided");
        }

        return errors.map(ValidatorExtension.NormalizeSingleError);
    }
}