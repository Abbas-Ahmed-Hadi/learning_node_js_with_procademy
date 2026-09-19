import { Error, ErrorType } from "./error.js";
import { ValidatorExtension } from "./validator.js";

export default class ValidationErrors extends Error {
    #errors;

    constructor(errors, code = "Validation.General") {
        super(
            code,
            "One or more validation errors occurred",
            ErrorType.Validation
        );

        this.#errors = ValidatorExtension.NormalizeArrayOfErrors(errors);
    }

    get errors() {
        return this.#errors;
    }
}