import MoviesServices from "./../services/movies_services.js";
import Response from "./../shared_kernal/response.js";
import { ErrorType } from "./../shared_kernal/error.js";
import Movie from "./../entities/movie.js";

export default class MoviesController {
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
        const movieId = Number.parseInt(req.params.id);
        
        const result = await MoviesServices.getMovieById(movieId);
    
        return result.isFailure
            ? result.error.type === ErrorType.NotFound
                ? Response.NotFound(res, result.error)
                : Response.InternalServerError(res, result.error)
            : Response.OK(res, result.value);
    }
    
    static async addMovie(req, res) {
        const movieId = req.params.id;
        
        const newMovie = new Movie(
            movieId,
            req.body.name, 
            req.body.description, 
            req.body.duration, 
            req.body.rating);
        
        const result = await MoviesServices.getMovieById(movieId, newMovie);
    
        return result.isFailure
            ? result.error.type === ErrorType.Conflict
                ? Response.Conflict(res, result.error)
                : Response.InternalServerError(res, result.error)
            : Response.Created(res, result.value);
    }
    
    static async updateMovieById(req, res) {
        const movieId = req.params.id;
        
        const movie = new Movie(
            movieId,
            req.body.name, 
            req.body.description, 
            req.body.duration, 
            req.body.rating);
        
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
            : Response.OK(res);
    }
}