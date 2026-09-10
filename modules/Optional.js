export default class Optional {
    #value;
    
    get value() {
        if (this.#value === null || this.#value === undefined) {
            throw new Exception(
                "There is no value to represent");
        }
        
        return this.#value;
    }
    
    static some(value) {
        if (value === null || value === undefined) {
            throw new Exception("The value of Optional type must not be null or undefined");
        }
        
        return new Optional(value);
    }
    
    static none() {
        return new Optional(null);
    }
}
