export default class MoviesMiddleware {

    static AddMiddlewares(movieSchema) {
        movieSchema.pre("save",
            MoviesMiddleware.#AddCreatedBy);

        movieSchema.pre(/^find/g,
            MoviesMiddleware.#FindOnlyValidReleaseDateMovies);

        movieSchema.pre("aggregate",
            MoviesMiddleware.#AggregateOnlyValidReleaseDateMovies);
    }
    
    static #FindOnlyValidReleaseDateMovies = function(next) {
        this.find({
            $match: {
                releaseDate: {
                    $lte: new Date()
                }
            }
        });
        
        next();
    }

    static #AggregateOnlyValidReleaseDateMovies = function(next) {
        this.pipline()
            .unshift({
                $match: {
                    releaseDate: {
                        $lte: new Date()
                    }
                }
            });

        next();
    }

    static #AddCreatedBy = function(next) {
        this.createdBy = "SERVICE_313_001";

        next();
    }
}