class ErrorType {
    static Failure = 0;
    static Validation = 1;
    static Problem = 2;
    static NotFound = 3;
    static Conflict = 4;
}


class Error {
    #code;
    #description;
    #type;

    static #None = new Error("", "", ErrorType.Failure);

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

    get type() {
        return this.#type;
    }

    get None() {
        return Error.#None;
    }

    get NullValue() {
        return Error.#NullValue;
    }

    static NotFound(code, description) {
        new Error(code, description, ErrorType.NotFound);
    }
    
    static Failure(code, description) {
        new Error(code, description, ErrorType.Failure);
    }
    
    static Validation(code, description) {
        return new Error(code, description, ErrorType.V)
    }
    
    static Problem(code, description) {
        new Error(code, description, ErrorType.Problem);
    }
    
    static Conflict(code, description) {
        new Error(code, description, ErrorType.Conflict);
    }
}

export { Error, ErrorType }
