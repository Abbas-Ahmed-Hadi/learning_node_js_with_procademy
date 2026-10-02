export default class MoviesMiddleware {

    static AddMiddlewares(movieSchema) {
        movieSchema.pre("save",
            MoviesMiddleware.#AddCreatedBy);

        movieSchema.pre("find",
            MoviesMiddleware.#FindOnlyValidReleaseDateMovies);

        movieSchema.pre("findOne",
            MoviesMiddleware.#FindOnlyValidReleaseDateMovies);

        movieSchema.pre("findOneAndUpdate",
            MoviesMiddleware.#FindOnlyValidReleaseDateMovies);

        movieSchema.pre("aggregate",
            MoviesMiddleware.#AggregateOnlyValidReleaseDateMovies);
    }

    static #FindOnlyValidReleaseDateMovies = function() {
        this.find({
            releaseDate: {
                $lte: new Date()
            }
        });
    }

    static #AggregateOnlyValidReleaseDateMovies = function() {
        this.pipeline()
            .unshift({
                $match: {
                    releaseDate: {
                        $lte: new Date()
                    }
                }
            });
    }

    static #AddCreatedBy = function() {
        this.createdBy = "SERVICE_313_001";
    }
}