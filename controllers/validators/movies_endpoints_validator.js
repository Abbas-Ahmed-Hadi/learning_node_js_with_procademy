import Response from "./../../shared_kernal/response.js";
import MoviesErrors from "./../../shared_kernal/movies_errors.js";
import ValidatorExtensions from "./../../shared_kernal/validator_extensions.js";
import Validator from "./../../shared_kernal/validator.js";

export default class MoviesEndpointsValidator {
    
    static #MovieObjectAttributes = [
        "name", "description", "duration", "rating",
        "totalRating", "releaseYear", "releaseDate",
        "geners", "directors", "coverImage", "actors",
        "price"
    ];
    
    static get MovieObjectAttributes() {
        return MoviesEndpointsValidator.#MovieObjectAttributes;
    }
    
    
    static ValidateMovieRequestBody(req, res, next) {
        const name = req.body.name;
        const description = req.body.description;
        const duration = req.body.duration;
        const rating = req.body.rating;
        
        let validationErrors = new Array(0);
        
        const nameErrors = Validator
            .ValidateString(name, "Name", 3, 50);
        
        if (nameErrors.length !== 0) {
            const errors = ValidatorExtensions
                .FormatArrayOfErrors(nameErrors);
            
            validationErrors = validationErrors.concat(errors);
        }
        
        const descriptionErrors = Validator
            .ValidateString(description, "Name", 3, 50);
        
        if (descriptionErrors.length !== 0) {
            const errors = ValidatorExtensions
                .FormatArrayOfErrors(descriptionErrors);
            
            validationErrors = validationErrors.concat(errors);
        }
        
        if (duration < 0) {
            validationErrors.push({
                field: "Duration",
                message: "Duration must not be negative"
            });
        }
        
        if (rating < 0 || rating > 5) {
            validationErrors.push({
                field: "Rating",
                message: "Rating must be between 0 and 5"
            });
        }
        
        if (validationErrors.length !== 0) {
            return Response
                .ValidationFailure(res, validationErrors);
        }
        
        next();
    }
    
    static ValidateMovieIdParam(_, res, next, value) {
        if (typeof value !== "string" ||
            value.length !== 24) {
            return Response
                .BadRequest(res, MoviesErrors.InvalidId(userId));
        }
        
        next();
    }
}