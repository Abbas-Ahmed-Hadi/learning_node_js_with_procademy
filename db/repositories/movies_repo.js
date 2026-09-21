import mongoose from "mongoose";
import MoviesModule from "./../modules/movies_module.js";
import Movie from "./../../entities/movie.js";

export default class MoviesRepository {
    constructor() { }

    async getAllMovies() {
        try {
            const allMovies = await MoviesModule.Module
                .find();

            const movies = allMovies.map(m => {
                return new Movie(
                    m._id.toString(),
                    m.name,
                    m.description,
                    m.duration,
                    m.rating);
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
                movie.rating
            );
        } catch (err) {
            console.log("An Error Occur:", err.message);
            return null;
        }
    }

    async addMovie(movie) {
        try {
            const addedMovieDoc = await MoviesModule.Module
                .create({
                    name: movie.name,
                    description: movie.description,
                    duration: movie.duration,
                    rating: movie.rating
                });

            return new Movie(
                addedMovieDoc._id.toString(),
                addedMovieDoc.name,
                addedMovieDoc.description,
                addedMovieDoc.duration,
                addedMovieDoc.rating
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
                .findByIdAndUpdate(movieId, {
                    name: movie.name,
                    description: movie.description,
                    duration: movie.duration,
                    rating: movie.rating
                });

            return new Movie(
                updatedMovie._id.toString(),
                updatedMovie.name,
                updatedMovie.description,
                updatedMovie.duration,
                updatedMovie.rating
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