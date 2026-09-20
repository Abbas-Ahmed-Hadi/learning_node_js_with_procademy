import express from "express";
import MoviesController from "./../controllers/movies_controller.js";
import Response from "./../shared_kernal/response.js";
import { Error, ErrorType } from "./../shared_kernal/error.js";
import MoviesErrors from "./../shared_kernal/movies_errors.js";
import ValidatorExtensions from "./../shared_kernal/validator_extensions.js";
import Validator from "./../shared_kernal/validator.js";

class MoviesEndpointsValidator {
    
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
            .ValidateString(name, "Name", 3, 50);
        
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
    
    static ValidateMovieIdParam(req, res, next, value) {
        const movieId = Number.parseInt(value);
        
        if (Number.isNaN(movieId)) {
            return Response.BadRequest(res, new Error(
                "Movies.InvalidId",
                "Movie id must be number",
                ErrorType.Validation));
        }
        
        if (movieId < 1) {
            return Response.BadRequest(res, 
                MoviesErrors.InvalidId(movieId));
        }
        
        next();
    }
}


export default class MoviesRouter {
    static #router;
    
    static {
        MoviesRouter.#router = express.Router();
        
        MoviesRouter.#router.route("/")
            .get(MoviesController.getAllMovies)
            .post(MoviesEndpointsValidator.ValidateMovieRequestBody, 
                MoviesController.addMovie);
        
        MoviesRouter.#router.param("id",
            MoviesEndpointsValidator.ValidateMovieIdParam);
        
        MoviesRouter.#router.route("/:id")
            .get(MoviesController.getMovieById)
            .put(MoviesEndpointsValidator.ValidateMovieRequestBody, 
                MoviesController.updateMovieById)
            .delete(MoviesController.deleteMovieById);
    }
    
    
    static get Router() {
        if (!MoviesRouter.#router) {
            throw new Exception("Movies router must be provided.");
        }
        
        return MoviesRouter.#router;
    }
    
    static get PathV1() {
        return "/api/v1/movies";
    }
}