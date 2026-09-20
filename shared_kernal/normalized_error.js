import { Error } from "./error.js";

export default class NormalizedError extends Error {
    #fieldName;
    
    constructor(fieldName, code, description, type) {
        super(code, description, type);
        
        this.#fieldName = fieldName;
    }
    
    static FromError(fieldName, error) {
        return new NormalizedError(
            fieldName,
            error.code,
            error.description,
            error.type);
    }
    
    get filedName() {
        return this.#fieldName;
    }
}