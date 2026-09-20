import MovieServices from "./../services/movie_services.js";
import Response from "./../shared_kernal/response.js";
import { ErrorType } from "./../shared_kernal/error.js";
import Movie from "./../entities/movie.js";

export default class MoviesController {
    static getAllMovies(_, res) {
        const result = MovieServices.getAllMovies();
        
        return result.isFailure
            ? Response.NotFound(res, result.error)
            : Response.OK(res, {
                count: result.value.length,
                movies: result.value
            });
    }
    
    static getMovieById(req, res) {
        const movieId = Number.parseInt(req.params.id);
        
        const result = MovieServices.getMovieById(movieId);
    
        return result.isFailure
            ? result.error.type === ErrorType.NotFound
                ? Response.NotFound(res, result.error)
                : Response.InternalServerError(res, result.error)
            : Response.OK(res, result.value);
    }
    
    static addMovie(req, res) {
        const movieId = Number.parseInt(req.params.id);
        
        const newMovie = new Movie(
            movieId,
            req.body.name, 
            req.body.description, 
            req.body.duration, 
            req.body.rating);
        
        const result = MovieServices.getMovieById(movieId, newMovie);
    
        return result.isFailure
            ? result.error.type === ErrorType.Conflict
                ? Response.Conflict(res, result.error)
                : Response.InternalServerError(res, result.error)
            : Response.Created(res, result.value);
    }
    
    static updateMovieById(req, res) {
        const movieId = Number.parseInt(req.params.id);
        
        const movie = new Movie(
            movieId,
            req.body.name, 
            req.body.description, 
            req.body.duration, 
            req.body.rating);
        
        const result = MovieServices.updateMovieById(movieId, movie);
    
        return result.isFailure
            ? result.error.type === ErrorType.NotFound
                ? Response.NotFound(res, result.error)
                : Response.InternalServerError(res, result.error)
            : Response.OK(res, result.value);
    }
    
    static deleteMovieById(req, res) {
        const movieId = Number.parseInt(req.params.id);
        
        const result = MovieServices.deleteMovieById(movieId);
    
        return result.isFailure
            ? result.error.type === ErrorType.NotFound
                ? Response.NotFound(res, result.error)
                : Response.InternalServerError(res, result.error)
            : Response.OK(res);
    }
}