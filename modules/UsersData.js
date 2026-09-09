import { default as fsp } from "fs/promises";
import fs from "fs";
import { Result, Success, Failure } from "../modules/Result.js";

export default class UsersData {
    static #UsersDataPath = "../data/users.json";

    #users;

    get Data() {
        return this.#users;
    }

    loadUsers() {
        this.#users = UsersData.getUsersDataAtTheStatrUp();
    }

    async addUser(user) {
        if (!user) {
            return Failure();
        }

        this.#users = UsersData.getUsersDataAtTheStatrUp();
        this.#users.push(user);

        try {
            await fsp.writeFile(
                UsersData.#UsersDataPath,
                this.#users,
                "utf8");
        } catch (err) {
            console.log("An Error Occur:", err.message);
            return false;
        }

        return true;
    }

    async updateUser(userId, user) {
        if (!user) {
            return false;
        }

        this.#users = UsersData.getUsersDataAtTheStatrUp();

        const userToUpdate = this.#users.find(u => u.id === userId);

        if (!userToUpdate) {

            return
        }

        userToUpdate.userName = user.userName;
        userToUpdate.password = user.password;

        try {
            await fsp.writeFile(
                UsersData.#UsersDataPath,
                this.#users,
                "utf8");
        } catch (err) {
            console.log("An Error Occur:", err.message);
            return false;
        }

        return true;
    }

    static getUsersDataAtTheStatrUp() {
        let data;
        try {
            data = fs.readFileSync(
                this.#UsersDataPath,
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
