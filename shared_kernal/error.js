class ErrorType {
    static Failure = "Failure";
    static NotFound = "NotFound";
    static Validation= "Validation";
    static Problem = "Problem";
    static Conflict = "Conflict";
}


class Error {
    #code;
    #description;
    #type;
    
    static #Empty = new Error("", "", ErrorType.Failure);
    
    static #NullValue = new Error(
        "General.NullValue",
        "Null or undefined value was provided.",
        ErrorType.Failure);
    
    constructor(code, description, type) {
        this.#code = code;
        this.#description = description;
        this.#type = type;
    }
    
    clone() {
        return new Error(this.#code, this.#description, this.#type);
    }
    
    get code() {
        return this.#code;
    }
    
    get description() {
        return this.#description;
    }
    
    get type() {
        return this.#type;
    }
    
    static get Empty() {
        return this.#Empty.clone();
    }
    
    static get NullValue() {
        return this.#NullValue.clone();
    }
    
    static Failure(code, description) {
        return new Error(code, description, ErrorType.Failure);
    }
    
    static NotFound(code, description) {
        return new Error(code, description, ErrorType.NotFound);
    }
    
    static Problem(code, description) {
        return new Error(code, description, ErrorType.Problem);
    }
    
    static Conflict(code, description) {
        return new Error(code, description, ErrorType.Conflict);
    }
}


export {
    Error,
    ErrorType
}