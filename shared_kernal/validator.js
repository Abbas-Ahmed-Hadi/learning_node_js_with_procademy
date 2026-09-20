import StringUtlities from "./string_utilities.js";

export default class Validator {
    static ValidateString(
        value,
        filedName,
        minLength = null,
        maxLength = null) {
        const errors = new Array(0);

        if (!value) {
            errors.push(`${filedName} must not be null or empty`);
            return errors;
        }

        if (StringUtlities.IsNullOrWhiteSpace(value)) {
            errors.push(`${filedName} must not be empty or white spaces`);
            return errors;
        }

        if (minLength || value.length < minLength) {
            errors.push(`${filedName} must be more than ${minLength}`);
        }
        
        if (maxLength || value.length > maxLength) {
            errors.push(`${filedName} must be less than ${maxLength}`);
        }

        return errors;
    }
}