import MoviesRepository from "./../db/repositories/movies_repo.js";
import { ResultOnly, ResultWithValue } from "./../shared_kernal/result.js";
import { Error, ErrorType } from "./../shared_kernal/error.js";
import MoviesErrors from "./../shared_kernal/movies_errors.js";

export default class MoviesServices {
    
    static async getAllMovies(queryObject) {
        const movieRepo = new MoviesRepository();
        const movies = await movieRepo.getAllMovies(queryObject);
        
        return !movies || movies.length === 0
            ? ResultOnly.Failure(new Error(
                "Movies.NoMovieFound",
                "There is no movie",
                ErrorType.NotFound))
            : ResultWithValue.Success(movies);
    }
    
    static async getMovieById(id) {
        const movieRepo = new MoviesRepository();
        const movie = await movieRepo.getMovieById(id);
        
        return !movie
            ? ResultOnly.Failure(MoviesErrors.NotFoundById(id))
            : ResultWithValue.Success(movie);
    }
    
    static async addMovie(movie) {
        const movieRepo = new MoviesRepository();
        const newMovie = await movieRepo.addMovie(movie);
        
        return !newMovie
            ? ResultOnly.Failure(MoviesErrors.CreationFailure(movie))
            : ResultWithValue.Success(newMovie);
    }
    
    static async updateMovieById(id, movie) {
        const movieRepo = new MoviesRepository();
        const updatedMovie = await movieRepo.updateMovieById(id, movie);
        
        return !updatedMovie
            ? ResultOnly.Failure(MoviesErrors.NotFoundById(id))
            : ResultWithValue.Success(updatedMovie);
    }
    
    static async deleteMovieById(id) {
        const movieRepo = new MoviesRepository();
        const isMovieDeleted = await movieRepo.deleteMovieById(id);
        
        return isMovieDeleted
            ? ResultOnly.Success()
            : ResultOnly.Failure(MoviesErrors.NotFoundById(id));
    }
}