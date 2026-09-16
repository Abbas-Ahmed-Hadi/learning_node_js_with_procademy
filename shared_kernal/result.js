import { Error } from "./error.js";

class ResultOnly {
    #isSuccess;
    #error;
    
    constructor(isSuccess, error) {
        if ((isSuccess && error !== Error.Empty) ||
            (!isSuccess && error === Error.Empty)) {
            throw new Exception("Invalid state of 'Result' type.")
        }
        
        this.#isSuccess = isSuccess;
        this.#error = error;
    }
    
    get isSuccess() {
        return this.#isSuccess;
    }
    
    get isFailure() {
        return !this.#isSuccess;
    }
    
    get error() {
        return this.#error;
    }
    
    static Success() {
        return ResultOnly(true, Error.Empty);
    }
    
    static Failure(error) {
        if (!error || error === Error.Empty) {
            throw new Exception("Error must not empty in a failure state.")
        }
        
        return new ResultOnly(false, error);
    }
}


class ResultWithValue extends ResultOnly {
    #value;
    
    constructor(isSuccess, error, value) {
        super(isSuccess, error);
        
        this.#value = value;
    }
    
    get value() {
        return this.#value;
    }
    
    static Success(value) {
        if (!value) {
            throw new Exception(
                "Value of seccess result must not be null or undefined.");
        }
        
        return ResultWithValue(true, Error.Empty, value);
    }
}


export {
    ResultOnly,
    ResultWithValue
}