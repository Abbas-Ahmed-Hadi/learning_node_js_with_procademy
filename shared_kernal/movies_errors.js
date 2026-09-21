import { Error, ErrorType } from "./error.js";

export default class MoviesErrors {
    static #NotFound = new Error(
        "Movies.NotFound",
        "Movie not found", 
        ErrorType.NotFound);
        
    static get NotFound() {
        return MoviesErrors.#NotFound;
    }
    
    static NotFoundById(id) {
        return new Error(
            "Movies.NotFoundById",
            `Movie with id: '${id}' is not found`, 
            ErrorType.NotFound);
    }
        
    static CreationFailure(movie) {
        return new Error(
            "Movies.CreationFailure",
            `Movie with name: ${movie.name} is not created`, 
            ErrorType.Problem);
    }
    
    static InvalidId(id) {
        return new Error(
            "Movies.InvalidId",
            `Invalid movie id: '${id}'`,
            ErrorType.Validation);
    }
}