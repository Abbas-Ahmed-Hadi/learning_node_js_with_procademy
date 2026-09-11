import { default as fsp } from "fs/promises";
import fs from "fs";
import { Error, ErrorType } from "./Error.js";
import { ResultOnly, ResultWithValue } from "./Result.js";

export default class UsersData {
    #users = null;

    get Data() {
        if (this.#users === null || this.#users === undefined) {
            throw new Exception("There is no users data");
        }

        return this.#users;
    }

    async loadUsersAsync() {
        if (this.#users === null || this.#users === undefined) {
            this.#users = UsersDataUtilities.getUsersData();
        }

        return ResultWithValue.success(this.#users);
    }

    async addUserAsync(user) {
        if (!user) {
            return ResultOnly.failure(Error.NullValue)
        }

        this.#users = UsersDataUtilities.getUsersData();
        
        user.id = (this.#users[this.#users?.length - 1]?.id ?? 0) + 1;
        
        this.#users.push(user);

        const result = await UsersDataUtilities.trySaveUsersDataAsync(this.#users);

        return result;
    }

    async updateUserAsync(userId, user) {
        if (!user) {
            return ResultOnly.failure(Error.NullValue);
        }

        this.#users = UsersDataUtilities.getUsersData();

        const userToUpdate = this.#users.find(u => u.id === userId);

        if (!userToUpdate) {
            return ResultOnly.failure(
                new Error(
                    "Users.NotFound",
                    `User with id: '${userId}' is not found`,
                    ErrorType.NotFound));
        }

        userToUpdate.userName = user.userName;
        userToUpdate.password = user.password;

        const result = await UsersDataUtilities.trySaveUsersDataAsync(this.#users);

        return result;
    }

    async deleteUserAsync(userId) {
        this.#users = UsersDataUtilities.getUsersData();

        const userToDelete = this.#users.find(u => u.id === userId);

        let idxUserToDelete = -1;
        
        if (!userToDelete) {
            return ResultOnly.failure(
                new Error(
                    "Users.NotFound",
                    `User with id: '${userId}' is not found`,
                    ErrorType.NotFound));
        }

        idxUserToDelete = this.#users.indexOf(userToDelete);

        this.#users.splice(idxUserToDelete, 1);

        const result = await UsersDataUtilities.trySaveUsersDataAsync(this.#users);

        return result;
    }
}


class UsersDataUtilities {
    static get UsersDataPath() {
        return "./../../../home/learning_node_js_with_procademy/data/users.json";
    }
    
    static openFileError(errorMessage) {
        const isNotFound = errorMessage.toLowerCase()
            .includes("not found");

        const code = isNotFound
            ? "File.NotFound"
            : "File.OpeningProblem";

        const description = isNotFound
            ? "File is not found."
            : "Problem with opening file.";

        return new Error(code, description,
            isNotFound ? ErrorType.Failure : ErrorType.Problem);
    }
    
    static async trySaveUsersDataAsync(data) {
        try {
            await fsp.writeFile(
                UsersDataUtilities.UsersDataPath,
                typeof data === "string" ? data : JSON.stringify(data),
                "utf8");
        } catch (err) {
            console.log("An Error Occur:", err.message);
            
            return ResultOnly.failure(
                UsersDataUtilities.openFileError(err.message));
        }
        
        return ResultOnly.success();
    }

    static getUsersData() {
        let data;
        try {
            data = fs.readFileSync(
                UsersDataUtilities.UsersDataPath,
                "utf8");
        } catch (err) {
            console.error("An Error Occur:", err.message);
            return new Array(0);
        }

        return data
            ? JSON.parse(data)
            : new Array(0);
    }
}