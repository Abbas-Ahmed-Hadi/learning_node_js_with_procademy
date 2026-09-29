import express from "express";
import MoviesController from "./../controllers/movies_controller.js";
import MoviesEndpointsValidator from "./../controllers/validators/movies_endpoints_validator.js";

export default class MoviesRouter {
    static #router;
    
    static {
        MoviesRouter.#router = express.Router();
        
        MoviesRouter.#router.route("/")
            .get(MoviesController.getMovies)
            .post(MoviesEndpointsValidator.ValidateMovieRequestBody, 
                MoviesController.addMovie);
                
        MoviesRouter.#router.route("/seeds/:times")
            .get(MoviesController.Seeds);
        
        MoviesRouter.#router.param("releaseYear",
            MoviesEndpointsValidator.ValidateMovieReleaseYearParam);
        
        MoviesRouter.#router.route("/statistics/:releaseYear")
            .get(MoviesController.getMoviesStatisticsByYearOfRelease);
        
        MoviesRouter.#router.route("/moviesByGener/:gener")
            .get(MoviesController.getMoviesByGener);
        
        MoviesRouter.#router.route("/highest-rated")
            .get(MoviesController.getHighestRatedMovies);
        
        MoviesRouter.#router.param("id",
            MoviesEndpointsValidator.ValidateMovieIdParam);
        
        MoviesRouter.#router.route("/:id")
            .get(MoviesController.getMovieById)
            .put(MoviesEndpointsValidator.ValidateMovieRequestBody, 
                MoviesController.updateMovieById)
            .delete(MoviesController.deleteMovieById);
    }
    
    
    static get Router() {
        if (!MoviesRouter.#router) {
            throw new Exception("Movies router must be provided.");
        }
        
        return MoviesRouter.#router;
    }
    
    static get PathV1() {
        return "/api/v1/movies";
    }
}