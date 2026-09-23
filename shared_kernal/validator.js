import StringUtlities from "./string_utilities.js";
import ValidatorExtensions from "./validator_extensions.js";

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
            errors.push(`${fieldName} length must be more than ${minLength}`);
        }
        
        if (maxLength && value.length > maxLength) {
            errors.push(`${fieldName} length must be less than ${maxLength}`);
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
    
    static ValidateObjectFields(
        sourceFields, 
        validationFieldsInfo, 
        fnValidator) {
        let validationErrors = new Array(0);

        for (const validationFieldInfo of validationFieldsInfo) {

            const sourceFieldValue = sourceFields[validationFieldInfo[0]];

            if (!sourceFieldValue) continue;

            const fieldErrors = fnValidator(
                sourceFieldValue,        // Value
                validationFieldInfo[0],  // Field Name
                validationFieldInfo[1],  // Field Minimum
                validationFieldInfo[2]); // Field Maximum

            if (fieldErrors.length !== 0) {
                const errors = ValidatorExtensions
                    .FormatArrayOfErrors(
                        fieldErrors,
                        validationFieldInfo[0]);

                validationErrors = validationErrors.concat(errors);
            }
        }

        return validationErrors;
    }
}