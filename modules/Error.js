import ErrorType from "./ErrorType.js";

export default class Error {
    #code;
    #description;
    #type;

    static #None = new Error("", "", ErrorType.None);

    static #NullValue = new Error(
        "General.Null",
        "Null value was provided",
        ErrorType.Failure
    );

    constructor(code, description, type) {
        this.#code = code;
        this.#description = description;
        this.#type = type;
    }

    get description() {
        return this.#description;
    }

    get code() {
        return this.#code;
    }

    get errorType() {
        return this.#type;
    }

    get None() {
        return Error.#None;
    }

    get NullValue() {
        return Error.#NullValue;
    }

    static Failure(code, description) {
        new Error(code, description, ErrorType.Failure);
    }
    
    static NotFound(code, description) {
        new Error(code, description, ErrorType.NotFound);
    }
    
    static Problem(code, description) {
        new Error(code, description, ErrorType.Problem);
    }
    
    static Conflict(code, description) {
        new Error(code, description, ErrorType.Conflict);
    }
}
