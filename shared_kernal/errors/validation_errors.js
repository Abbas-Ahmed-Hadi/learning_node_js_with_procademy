import { Error, ErrorType } from "./error.js";
import ValidatorExtensions from "./validator_extensions.js";

export default class ValidationErrors extends Error {
    #errors;

    constructor(errors, code = "Validation.General") {
        super(
            code,
            "One or more validation errors occurred",
            ErrorType.Validation);

        this.#errors = ValidatorExtensions
            .FormatArrayOfErrors(errors);
    }

    get errors() {
        return this.#errors;
    }
}