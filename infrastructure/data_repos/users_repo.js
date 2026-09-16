import DB_Manager from "./../db_manager.js";

import UsersRepositoryContract from "./../../appliaction/contracts/users_repo_contracts.js";

export default 
class UsersRepository extends UsersRepositoryContract {
    GetAllUsers = function getAllUsers() {
        DB_Manager.connect();
        
        const connection = DB_Manager.connection;
        
        
    }
}