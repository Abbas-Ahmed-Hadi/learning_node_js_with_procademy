import Controller from "./controller.js";
import MoviesServices from "./../services/movies_services.js";
import Response from "./../shared_kernal/response.js";
import { ErrorType } from "./../shared_kernal/error.js";
import Movie from "./../entities/movie.js";

export default class MoviesController {

    static #CreateMovieFromRequestBody(requestBody) {
        const movieObj = {}

        for (const attributeName of Movie.FieldsNames) {
            if (attributeName in requestBody) {
                movieObj[attributeName] = requestBody[attributeName];
            }
        }

        return movieObj;
    }
    
    static async #getMoviesWithSecondaryRequestQuery(
        req,
        res,
        secondaryRequestQuery = null) {

        const queryStringObject = {
            ... secondaryRequestQuery,
            ... req.query
        };

        const mainQueryObjectWithItsFilters = Controller
            .GetRequestBodyFieldsWithItsFilters(
                queryStringObject);

        const queryObjectWithItsFilters = {};

        for (const fieldName of Movie.FieldsNames) {
            if (fieldName in mainQueryObjectWithItsFilters) {
                queryObjectWithItsFilters[fieldName] = 
                    mainQueryObjectWithItsFilters[fieldName];
            }
        }

        const sortingQueryArray = Controller
            .GetQuerySortingFieldsFromRequestQueryString(
                queryStringObject);
                
        const limitedFields = Controller
            .GetLimitedFieldsFromRequestQueryString(
                queryStringObject);

        const result = await MoviesServices
            .getMovies(
                queryObjectWithItsFilters,
                sortingQueryArray,
                limitedFields,
                queryStringObject.page ?? 1,
                queryStringObject.size ?? 10);

        return result.isFailure
            ? Response.NotFound(res, result.error)
            : Response.OK(res, {
                count: result.value.length,
                movies: result.value
            });
    }
    

    static async Seeds(req, res) {
        const times = req.params.times ?? 10;

        const result = await MoviesServices
            .Seeds(times);

        return result.isFailure
            ? Response.NotFound(res, result.error)
            : Response.OK(res, {
                count: result.value.length,
                movies: result.value
            });
    }
    
    
    static async getMoviesStatisticsByYearOfRelease(req, res)
    {
        const releaseYear = Number.parseInt(req.params.releaseYear);
    
        const result = await MoviesServices
            .getMoviesStatisticsByYearOfRelease(releaseYear);
            
        return result.isFailure
            ? result.error.type === ErrorType.NotFound
                ? Response.NotFound(res, result.error)
                : Response.InternalServerError(res, result.error)
            : Response.OK(res, {
                count: result.value.length,
                statistices: result.value
            });
    }

    static async getHighestRatedMovies(req, res) {
        
        const secondaryRequestQuery = {
            sort: "-rating",
            page: "1",
            size: "5"
        }
        
        return await MoviesController
            .#getMoviesWithSecondaryRequestQuery(
                req,
                res,
                secondaryRequestQuery);
    }

    static async getMovies(req, res) {

        return await MoviesController
            .#getMoviesWithSecondaryRequestQuery(
                req,
                res);
    }

    static async getMovieById(req, res) {
        const movieId = req.params.id;

        const result = await MoviesServices.getMovieById(movieId);

        return result.isFailure
            ? result.error.type === ErrorType.NotFound
                ? Response.NotFound(res, result.error)
                : Response.InternalServerError(res, result.error)
            : Response.OK(res, result.value);
    }

    static async addMovie(req, res) {
        const newMovie = MoviesController
            .#CreateMovieFromRequestBody(req.body);

        const result = await MoviesServices.addMovie(newMovie);

        return result.isFailure
            ? result.error.type === ErrorType.Conflict
                ? Response.Conflict(res, result.error)
                : Response.InternalServerError(res, result.error)
            : Response.Created(res, result.value);
    }

    static async updateMovieById(req, res) {
        const movieId = req.params.id;

        const movie = MoviesController
            .#CreateMovieFromRequestBody(req.body);

        const result = await MoviesServices.updateMovieById(movieId, movie);

        return result.isFailure
            ? result.error.type === ErrorType.NotFound
                ? Response.NotFound(res, result.error)
                : Response.InternalServerError(res, result.error)
            : Response.OK(res, result.value);
    }

    static async deleteMovieById(req, res) {
        const movieId = req.params.id;

        const result = await MoviesServices.deleteMovieById(movieId);

        return result.isFailure
            ? result.error.type === ErrorType.NotFound
                ? Response.NotFound(res, result.error)
                : Response.InternalServerError(res, result.error)
            : Response.NoContent(res);
    }
}