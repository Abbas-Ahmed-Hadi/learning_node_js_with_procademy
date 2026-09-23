import StringUtlities from "./string_utilities.js";

export default class Validator {
    static ValidateString(
        value,
        fieldName,
        minLength = null,
        maxLength = null) {
        const errors = new Array(0);

        if (!value) {
            errors.push(`${fieldName} must not be null or empty`);
            return errors;
        }

        if (StringUtlities.IsNullOrWhiteSpace(value)) {
            errors.push(`${fieldName} must not be empty or white spaces`);
            return errors;
        }

        if (minLength && value.length < minLength) {
            errors.push(`${fieldName} must be more than ${minLength}`);
        }
        
        if (maxLength && value.length > maxLength) {         errors.push(`${fieldName} must be less than ${maxLength}`);
        }

        return errors;
    }
    
    static ValidateNumber(
        value,
        fieldName,
        minValue = null,
        maxValue = null) {
        const errors = new Array(0);
        
        if (!value) {
            errors.push(`${fieldName} must not be null`);
            return errors;
        }
;
        if (Number.isNaN(value)) {
            errors.push(`${fieldName} must be a valid number`);
            return errors;
        }

        if (!Number.isNaN(minValue) && value < minValue) {
            errors.push(`${fieldName} must be greater than ${minValue}`);
        }

        if (!Number.isNaN(maxValue) && value > maxValue) {
            errors.push(`${fieldName} must be less than ${maxValue}`);
        }

        return errors;
    }
}