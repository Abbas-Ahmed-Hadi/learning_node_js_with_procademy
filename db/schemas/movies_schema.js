import mongoose from "mongoose";

export default class MoviesSchema {
    static #schema;
    
    static {
        MoviesSchema.#schema = new mongoose.Schema({
           name: {
               type: String,
               require: [true, "Name is required"],
               unique: [true, "Name must be unique"]
           },
           description: {
               type: String,
               require: [true, "Description is required"]
           },
           duration: {
               type: Number,
               require: [true, "Duration is required"]
           },
           rating: {
               type: Number,
               default: 0
           }
        });
    }
    
    static get Schema() {
        return MoviesSchema.#schema;
    }
}