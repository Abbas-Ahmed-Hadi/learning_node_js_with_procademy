import mongoose from "mongoose";
import { DB_CONN_STR } from "./../../config.js";
import UsersRepository from "./data_repos/users_repo.js";
import MoviesRepository from "./data_repos/movies_repo.js";

export default 
class DB_Manager {
    #mongooseInstance = mongoose;
    #usersRepo;
    #moviesRepo;
    
    constructor() {}
    
    connect() {
        this.#mongooseInstance.connect(DB_CONN_STR)
            .then((conn) => {
                console.log("Connection:", conn);
                console.log("Connection To DB Success.");
            })
            .catch((err) => {
                console.log("An Error Occur:", err.message);
                console.log("Connection To DB Failed.");
            });
    }
    
    get connection() {
        // TODO: I need to investigate about how to 
        //         get the connection from mongoose.
        return this.#mongooseInstance;
    }
    
    get usersRepo() {
        if (!this.#usersRepo) {
            this.#usersRepo = new UsersRepository();
        }
        
        return this.#usersRepo;
    }
    
    get moviesRepo() {
        if (!this.#moviesRepo) {
            this.#moviesRepo = new MoviesRepository();
        }
        
        return this.#moviesRepo;
    }
}
