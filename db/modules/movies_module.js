import mongoose from "mongoose";
import MoviesSchema from "./../schemas/movies_schema.js";

export default class MoviesModule {
    static #Module;
    
    static {
        MoviesModule.#Module = mongoose
            .model("movies", MoviesSchema.Schema);
    }
    
    static get Module() {
        return MoviesModule.#Module;
    }
}