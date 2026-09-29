import MoviesRepository from "./../db/repositories/movies_repo.js";
import { ResultOnly, ResultWithValue } from "./../shared_kernal/result.js";
import { Error, ErrorType } from "./../shared_kernal/error.js";
import MoviesErrors from "./../shared_kernal/movies_errors.js";

export default class MoviesServices {
    
    static async Seeds(times = 10) {
        const movies = await MoviesRepository.Seed(times);
        
        return !movies || movies.length === 0
            ? ResultOnly.Failure(new Error(
                "Movies.NoSeeds",
                "There is no movie",
                ErrorType.NotFound))
            : ResultWithValue.Success(movies);
    }
    
    
    static async getMoviesByGener(gener) {
        const moviesRepo = new MoviesRepository();
        
        const movies = await moviesRepo
            .getMoviesByGener(gener);
            
        return !movies || movies.length === 0
            ? ResultOnly.Failure(new Error(
                "Movies.NotFound",
                `There is no movie published with '${gener}' gener`,
                ErrorType.NotFound))
            : ResultWithValue.Success(movies);
    }
    
    static async getMoviesStatisticsByYearOfRelease(releaseYear) {
        const moviesRepo = new MoviesRepository();
        
        const statistics = await moviesRepo
            .getMoviesStatisticsByYearOfRelease(releaseYear);
            
        return !statistics || statistics.length === 0
            ? ResultOnly.Failure(new Error(
                "Movies.NotFound",
                `There is no movie published in ${releaseYear} year`,
                ErrorType.NotFound))
            : ResultWithValue.Success(statistics);
    }
    
    static async getMovies(
        queryObjectWithItsFilters, 
        sortingQueryArray,
        limitedFields,
        page,
        size) {
        const movieRepo = new MoviesRepository();

        const movies = await movieRepo
            .getMovies(
                queryObjectWithItsFilters, 
                sortingQueryArray,
                limitedFields,
                page,
                size);
        
        return !movies || movies.length === 0
            ? ResultOnly.Failure(new Error(
                "Movies.NotFound",
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