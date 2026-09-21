import mongoose from "mongoose";

export default class MoviesSchema {
    static #schema;

    static {
        MoviesSchema.#schema = new mongoose.Schema({
            name: {
                type: String,
                require: [true, "Name is required field!"],
                unique: [true, "Name must be unique"],
                trim: true
            },
            description: {
                type: String,
                require: [true, "Description is required field!"],
                trim: true
            },
            duration: {
                type: Number,
                require: [true, "Duration is required field!"]
            },
            rating: {
                type: Number
            },
            totalRating: {
                type: Number
            },
            releaseYear: {
                type: Number,
                require: [true, "Release year is required field!"]
            },
            releaseDate: {
                type: Date
            },
            createdAt: {
                type: Date,
                default: Date.now()
            },
            geners: {
                type: [String],
                require: [true, "Geners is required field!"]
            },
            directors: {
                type: [String],
                require: [true, "Directors is required field!"]
            },
            coverImage: {
                type: String,
                require: [true, "Cover image is required field!"]
            },
            actors: {
                type: [String],
                require: [true, "Actors is required field!"]
            },
            price: {
                type: Number,
                require: [true, "price is required field!"]
            }
        });
    }

    static get Schema() {
        return MoviesSchema.#schema;
    }
}