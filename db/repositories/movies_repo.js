import mongoose from "mongoose";
import MoviesModule from "./../modules/movies_module.js";
import Movie from "./../../entities/movie.js";

export default class MoviesRepository {
    constructor() { }

    async getAllMovies() {
        try {
            const allMovies = await MoviesModule.Module
                .find();

            const movies = allMovies.map(movie => {
                return new Movie(
                    movie._id.toString(),
                    movie.name,
                    movie.description,
                    movie.duration,
                    movie.rating,
                    movie.totalRating,
                    movie.releaseYear,
                    movie.releaseDate,
                    movie.createdAt,
                    movie.geners,
                    movie.directors,
                    movie.coverImage,
                    movie.actors,
                    movie.price);
            });

            return movies;
        } catch (err) {
            console.log("An Error Occur:", err.message);
            return [];
        }
    }

    async getMovieById(id) {
        try {
            const movieId = new mongoose.Types.ObjectId(id);
            const movie = await MoviesModule.Module
                .findById(movieId);

            return new Movie(
                movie._id.toString(),
                movie.name,
                movie.description,
                movie.duration,
                movie.rating,
                movie.totalRating,
                movie.releaseYear,
                movie.releaseDate,
                movie.createdAt,
                movie.geners,
                movie.directors,
                movie.coverImage,
                movie.actors,
                movie.price
            );
        } catch (err) {
            console.log("An Error Occur:", err.message);
            return null;
        }
    }

    async addMovie(movie) {
        try {
            const addedMovieDoc = await MoviesModule.Module
                .create(movie);

            return new Movie(
                addedMovieDoc._id.toString(),
                addedMovieDoc.name,
                addedMovieDoc.description,
                addedMovieDoc.duration,
                addedMovieDoc.rating,
                addedMovieDoc.totalRating,
                addedMovieDoc.releaseYear,
                addedMovieDoc.releaseDate,
                addedMovieDoc.createdAt,
                addedMovieDoc.geners,
                addedMovieDoc.directors,
                addedMovieDoc.coverImage,
                addedMovieDoc.actors,
                addedMovieDoc.price
            );
        } catch (err) {
            console.log("An Error Occur:", err.message);
            return null;
        }
    }

    async updateMovieById(id, movie) {
        try {
            const movieId = new mongoose.Types.ObjectId(id);
            const updatedMovie = await MoviesModule.Module
                .findByIdAndUpdate(movieId, movie, {
                    new: true,
                    runValidators: true
                });

            return new Movie(
                updatedMovie._id.toString(),
                updatedMovie.name,
                updatedMovie.description,
                updatedMovie.duration,
                updatedMovie.rating,
                updatedMovie.totalRating,
                updatedMovie.releaseYear,
                updatedMovie.releaseDate,
                updatedMovie.createdAt,
                updatedMovie.geners,
                updatedMovie.directors,
                updatedMovie.coverImage,
                updatedMovie.actors,
                updatedMovie.price
            );
        } catch (err) {
            console.log("An Error Occur:", err.message);
            return null;
        }
    }

    async deleteMovieById(id) {
        try {
            const movieId = new mongoose.Types.ObjectId(id);
            const deletedMovie = await MoviesModule.Module
                .findByIdAndDelete(movieId);
            
            return Boolean(deletedMovie);
        } catch (err) {
            console.log("An Error Occur:", err.message);
            return false;
        }
    }
}