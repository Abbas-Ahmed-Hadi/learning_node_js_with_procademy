import Response from "./../../shared_kernal/response.js";
import MoviesErrors from "./../../shared_kernal/movies_errors.js";
import Validator from "./../../shared_kernal/validator.js";
import Movie from "./../../entities/movie.js";
import { Error, ErrorType } from "./../../shared_kernal/error.js";

export default class MoviesEndpointsValidator {

    static ValidateMovieRequestBody(req, res, next) {
        let validationErrors = new Array(0);

        const stringTypeFieldsValidationErrors = Validator
            .ValidateObjectFields(
                req.body,
                Movie.StringTypeFieldsValidationInfo,
                Validator.ValidateString
            );

        const numberTypeFieldsValidationErrors = Validator
            .ValidateObjectFields(
                req.body,
                Movie.NumberTypeFieldsValidationInfo,
                Validator.ValidateNumber
            );

        validationErrors = validationErrors
            .concat(
                stringTypeFieldsValidationErrors,
                numberTypeFieldsValidationErrors
            );

        if (validationErrors.length !== 0) {
            return Response
                .ValidationFailure(res, validationErrors);
        }

        next();
    }
    
    static ValidateMovieReleaseYearParam(_, res, next, value) {
        const releaseYear = Number.parseInt(value);
        
        if (Number.isNaN(releaseYear)) {
            return Response.BadRequest(res, 
                new Error(
                    "Movies.InvalidReleaseYear",
                    "Release year must be number",
                    ErrorType.Validation));
        }
        
        const currentYear = new Date().getUTCFullYear();
        
        if (releaseYear < 1888 || releaseYear > currentYear) {
            return Response.BadRequest(res, 
                new Error(
                    "Movies.InvalidReleaseYear",
                    `Release year must be between 1888 and ${currentYear}`,
                    ErrorType.Validation));
        }
        
        next();
    }

    static ValidateMovieIdParam(_, res, next, value) {
        if (typeof value !== "string" ||
            value.length !== 24) {
            return Response
                .BadRequest(res, MoviesErrors.InvalidId(value));
        }

        next();
    }
}