export default 
class ValidationError extends Error {
    #errors;
    
    constructor(errors) {
        super(
            "Validation.General",
            "One or more validation errors occurred",
            ErrorType.Validation);
            
        this.#errors = errors;
    }
    
    get errors() {
        return this.#errors;
    }
    
    static fromResult(results) {
        const errors = results
            .filter(r => r.isFailure)
            .map(r => r.error);
        
        return new ValidationError(errors);
    }
}
