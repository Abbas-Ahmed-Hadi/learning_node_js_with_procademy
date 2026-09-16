import { Error } from "./Error.js";

class ResultOnly {
    #isSuccess;
    #error;

    constructor(isSuccess, error) {
        if (isSuccess && error !== Error.None ||
            !isSuccess && error === Error.None) {
            throw new Exception(`Invalid error ${typeof error}`)
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
    
    static success() {
        return new ResultOnly(true, Error.None);
    }

    static failure(error) {
        return new ResultOnly(false, error);
    }
}


class ResultWithValue extends ResultOnly {
    #value;

    constructor(isSuccess, value, error) {
        super(isSuccess, error);
        this.#value = value;
    }

    get Value() {
        if (this.isFailure) {
            throw new Exception(
                "The value of a failure result can't be accessed.");
        }
        
        return this.#value;
    }
        
    static success(value) {
        return new ResultWithValue(true, value, Error.None);
    }
}

export {
    ResultOnly,
    ResultWithValue
}

