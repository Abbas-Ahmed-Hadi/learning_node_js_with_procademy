import UsersData from "../modules/UsersData.js";
import Response from "../modules/Response.js";
import User from "../modules/User.js";

export default class UsersEndPoints {

    static async getAllUsers(_, res) {
        const usersData = new UsersData();

        if (!usersData.Data) {
            Response.notFound(res, "No users found");
            return;
        }

        Response.ok(res, {
            count: usersData.Data.length,
            users: usersData.Data
        });
    }

    static async getUser(req, res) {
        const userId = Number.parseInt(req.params.id);
        
        if (Number.isNaN(userId)) {
            Response.badRequest(res, 
                `Invalid user id`);
                
            return;
        }
        
        const usersData = new UsersData();
        const user = usersData.Data
            .find(u => u.id === userId);

        if (!user) {
            Response.notFound(res,
                `User not found with id '${userId}'`);
            return;
        }

        Response.ok(user);
    }

    static async addUser(req, res) {
        const users = UsersData.Data();

        let newId = users[users?.length - 1]?.id ?? 0;
        newId++;

        const newUser = new User(
            newId,
            req.body.userName,
            req.body.password
        );

        users.push(newUser);

        try {
            await fsp.writeFile(
                "./data/users.json",
                JSON.stringify(users));
        } catch (err) {
            console.log("An Error Occur:", err.message);

            Response.internalServerError(res);
            return;
        }

        Response.created(res, newUser);
    }

    static async updateUser(req, res) {
        const userId = Number.parseInt(req.params.id);
        const userToUpdate = users.find(u => u.id === userId);

        if (!userToUpdate) {
            Response.notFound(res,
                `User not found with id '${userId}'`);
            return;
        }

        userToUpdate.id = userId;
        userToUpdate.userName = req.body.userName;
        userToUpdate.password = req.body.password;

        try {
            await fsp.writeFile(
                "./data/users.json",
                JSON.stringify(users));
        } catch (err) {
            console.log("An Error Occur:", err.message);

            Response.internalServerError(res);
            return;
        }

        Response.ok(res, userToUpdate);
    }

    static async deleteUser(req, res) {
        const userId = Number.parseInt(req.params.id);

        const userToDelete = users.find(u => u.id === userId);

        if (!userToDelete) {
            failedUserNotFoundById(res, userId);
            return;
        }

        const indexOfUserToDelete = users.indexOf(userToDelete);
        if (indexOfUserToDelete === -1) {
            failedNotFoundById(res,
                `User not found with id '${userId}'`);
            return;
        }

        users.splice(indexOfUserToDelete, 1);

        try {
            await fsp.writeFile(
                "./data/users.json",
                JSON.stringify(users));
        } catch (err) {
            console.log("An Error Occur:", err.message);

            Response.internalServerError(res);
            return;
        }

        Response.ok(res);
    }
}
