import Response from "./../../shared_kernal/response.js";
import MoviesErrors from "./../../shared_kernal/movies_errors.js";
import Validator from "./../../shared_kernal/validator.js";
import Movie from "./../../entities/movie.js";

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

    static ValidateMovieIdParam(_, res, next, value) {
        if (typeof value !== "string" ||
            value.length !== 24) {
            return Response
                .BadRequest(res, MoviesErrors.InvalidId(value));
        }

        next();
    }
}