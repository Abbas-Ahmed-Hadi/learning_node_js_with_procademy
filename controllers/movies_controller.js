import MoviesServices from "./../services/movies_services.js";
import Response from "./../shared_kernal/response.js";
import { ErrorType } from "./../shared_kernal/error.js";
import MoviesEndpointsValidator from "./validators/movies_endpoints_validator.js";

export default class MoviesController {
    
    static #CreateMovieFromRequestBody(req) {
        const movieObj = {}
        
        for (const attributeName of MoviesEndpointsValidator.MovieObjectAttributes) {
            if (attributeName in req.body) {
                movieObj[attributeName] = req.body[attributeName];
            }
        }
        
        return movieObj;
    }
    
    static async getAllMovies(_, res) {
        const result = await MoviesServices.getAllMovies();
        
        return result.isFailure
            ? Response.NotFound(res, result.error)
            : Response.OK(res, {
                count: result.value.length,
                movies: result.value
            });
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
            .#CreateMovieFromRequestBody(req);
        
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
            .#CreateMovieFromRequestBody(req);
        
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