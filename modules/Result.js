import Error from "./Error.js";

class Result { }

class Success extends Result {
    #value;

    constructor(value) {
        this.#value = value;
    }

    get Value() {
        return this.#value;
    }
}

class Failure extends Result {
    #error = Error.None;

    constructor(error) {
        this.#error = error;
    }

    get Error() {
        return this.#error;
    }
}


export {
    Result,
    Success,
    Failure
}

