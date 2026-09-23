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

    // @info each string attribute with its:
    // Name, MinimumLength, MaximumLength
    static #StringAttributesInfo = [
        ["name", 3, 50],
        ["description", 10, 500],
        ["coverImage", 24, 150]
    ]

    // @info each number attribute with its:
    // Name, MinimumLength , MaximumLength
    // if minLength, or maxLength its value null 
    // then it optional
    static #NumberAttributesInfo = [
        ["rating", 0, 10],
        ["totalRating", 0, Number.POSITIVE_INFINITY],
        ["releaseYear", 1700, 3000],
        ["price", 0.99, Number.POSITIVE_INFINITY]
    ]


    static ValidateMovieRequestBody(req, res, next) {
        let validationErrors = new Array(0);

        const stringValidationErrors = MoviesEndpointsValidator
            .#ValidateField(
                req.body,
                MoviesEndpointsValidator.#StringAttributesInfo,
                Validator.ValidateString
            );

        const numbersValidationErrors = MoviesEndpointsValidator
            .#ValidateField(
                req.body,
                MoviesEndpointsValidator.#NumberAttributesInfo,
                Validator.ValidateNumber
            );

        validationErrors = validationErrors
            .concat(
                stringValidationErrors,
                numbersValidationErrors
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
                .BadRequest(res, MoviesErrors.InvalidId(userId));
        }

        next();
    }


    static get MovieObjectAttributes() {
        return MoviesEndpointsValidator.#MovieObjectAttributes;
    }

    static #ValidateField(sourceFields, validationFieldsInfo, fnValidator) {

        let validationErrors = new Array(0);

        for (const validationFieldInfo of validationFieldsInfo) {

            const sourceFieldValue = sourceFields[validationFieldInfo[0]];

            if (!sourceFieldValue) continue;

            const fieldErrors = fnValidator(
                sourceFieldValue,        // Value
                validationFieldInfo[0],  // Field Name
                validationFieldInfo[1],  // Field Minimum
                validationFieldInfo[2]); // Field Maximum

            console.log(`fieldErrors {${validationFieldInfo[0]}}:`, fieldErrors);

            if (fieldErrors.length !== 0) {
                const errors = ValidatorExtensions
                    .FormatArrayOfErrors(
                        fieldErrors,
                        validationFieldInfo[0]);

                validationErrors = validationErrors.concat(errors);
            }
        }

        return validationErrors;
    }
}