import mongoose from "mongoose";
import MoviesModule from "./../modules/movies_module.js";
import Movie from "./../../entities/movie.js";
import RandomNumberGenerator from "./../../shared_kernal/random_number_generator.js";

export default class MoviesRepository {
    constructor() { }
    
    static async Seed(times = 10) {
        try {
            const seeds = [];
            let newObj;
            
            for (let i = 1; i <= times; i++) {
                newObj = {
                    name: `Movie ${i}`,
                    description: `TEST * TEST ${i}`,
                    duration: RandomNumberGenerator.GetInt(40, Math.floor(3.5 * i)),
                    rating: RandomNumberGenerator.GetInt() % 10,
                    totalRating: RandomNumberGenerator.GetInt(),
                    price: RandomNumberGenerator.GetFloat() * ((i % 5) + 1)
                };
                
                console.log(`SEED ${i}:`, newObj);
                
                seeds.push(newObj);
            }
            
            const insertedMoviesSeeds = await MoviesModule
                .Module.insertMany(seeds);
            
            const newMovies = insertedMoviesSeeds
                .map(m => {
                    const newMovie = {};
                    for (const [key, value] of Object.entries(m._doc)) {
                        if (key === "_id") {
                            newMovie["id"] = value.toString();
                        } else {
                            newMovie[key] = value;
                        }
                    }
                    
                    return newMovie;
                });
                
            return newMovies;
        } catch (err) {
            console.log("An Error Occur:", err.message);
            return [];
        }
    }

    
    async getMoviesStatisticsByYearOfRelease(releaseYear) {
        try {
            const statistics = await MoviesModule.Module
                .aggregate([
                    { $match: { releaseYear: { $eq: releaseYear } } },
                    {
                        $group: {
                            _id: releaseYear,
                            minRating:   { $min: "$rating" },
                            avgRating:   { $avg: "$rating" },
                            maxRating:   { $max: "$rating" },
                            totalRating: { $sum: "$totalRating" },
                            minPrice:    { $min: "$price" },
                            avgPrice:    { $avg: "$price" },
                            maxPrice:    { $max: "$price" },
                            totalPrice:  { $sum: "$price" },
                            count:       { $sum: 1 }
                        }
                    }
                ]);
            
            return statistics;
        } catch (err) {
            console.log("An Error Occur:", err.message);
            return [];
        }
    }


    async getMovies(
        queryObjectWithItsFilters,
        sortingQueryArray,
        limitedFields,
        page,
        size) {
        try {
            let query = MoviesModule.Module
                .find(queryObjectWithItsFilters);
                
            if (sortingQueryArray && sortingQueryArray.length !== 0) {
                query = query.sort(sortingQueryArray.join(" "));
            } else {
                query = query.sort("-createdAt");
            }
            
            if (limitedFields && limitedFields.length !== 0) {
                query = query.select(limitedFields.join(" "));
            } else {
                query = query.select("-__v");
            }
            
            if (page && Math.floor(page) > -1) {
                query = query
                    .skip((page - 1) * size)
                    .limit(size)
            }
                
            const allMovies = await query;
            
            const movies = allMovies
                .map(m => {
                    const newMovie = {};
                    for (const [key, value] of Object.entries(m._doc)) {
                        if (key === "_id") {
                            newMovie["id"] = value.toString();
                        } else {
                            newMovie[key] = value;
                        }
                    }
                    
                    return newMovie;
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