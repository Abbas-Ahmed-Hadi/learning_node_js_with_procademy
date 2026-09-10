import UsersData from "../../modules/UsersData.js";
import { Response } from "../../modules/Response.js";
import User from "../../modules/User.js";
import StringUtilities from "../../utilities/string_utilities.js";
import { ErrorType } from "../../modules/Error.js";

export default class UsersEndPoints {

    static async getAllUsers(_, res) {
        const usersData = new UsersData();
        
        const result = await usersData.loadUsersAsync();
        
        if (result.isFailure) {
            Response.notFound(res, result.error);
            return;
        }
        
        const data = usersData.Data;

        if (!data) {
            Response.notFound(res, "No users found");
            return;
        }

        Response.ok(res, {
            count: data.length,
            users: data
        });
    }

    static async getUser(req, res) {
        const userId = Number.parseInt(req.params.id);

        if (Number.isNaN(userId) || userId < 1) {
            Response.badRequest(res, "Invalid user id");
            return;
        }
        if (userId < 1) {
            Response.badRequest(res, "User Id must not be zero or nagative.");
            return;
        }

        const usersData = new UsersData();
        const result = await usersData.loadUsersAsync();
        
        if (result.isFailure) {
            Response.notFound(res, result.error);
            return;
        }

        const user = result.Value.find(u => u.id === userId);

        if (!user) {
            Response.notFound(res,
                `User not found with id '${userId}'`);
            return;
        }

        Response.ok(res, user);
    }

    static async addUser(req, res) {
        const userName = req.body.userName;
        const password = req.body.password;
        
        if (StringUtilities.isNullOrWhiteSpace(password) ||
            StringUtilities.isNullOrWhiteSpace(userName)) {
            Response.badRequest(res);
            return;
        }

        const usersData = new UsersData();
        
        const newUser = new User(
            0,
            userName,
            password);
      
        const result = await usersData.addUserAsync(newUser);

        if (result.isFailure) {
            Response.internalServerError(res, result.error);
            return;
        }

        Response.created(res, newUser);
    }

    static async updateUser(req, res) {
        const userId = Number.parseInt(req.params.id);
        
        if (Number.isNaN(userId)) {
            Response.badRequest(res, "Invalid user id");
            return;
        }
        if (userId < 1) {
            Response.badRequest(res, "User Id must not be zero or nagative.");
            return;
        }
        
        const userToUpdate = new User(
            userId,
            req.body.userName,
            req.body.password);
        
        const usersData = new UsersData();
        
        const result = await usersData.updateUserAsync(userId, userToUpdate);
        
        if (result.isFailure) {
            const error = result.error;
            
            if (error.type === ErrorType.NotFound){
                Response.notFound(res, error);
            } else {
                Result.internalServerError(res, error);
            }
            
            return;
        }
        
        Response.ok(res, userToUpdate);
    }

    static async deleteUser(req, res) {
        const userId = Number.parseInt(req.params.id);

        if (Number.isNaN(userId)) {
            Response.badRequest(res, "Invalid user id");
            return;
        }
        if (userId < 1) {
            return Response.badRequest(
                res, 
                new Error(
                    "User.InvalidID",
                    "User id must not be zero or negative",
                    ErrorType.Validation));
        }

        const usersData = new UsersData();
        
        const result = await usersData.deleteUserAsync(userId);

        if (result.isFailure) {
            const error = result.error;
            
            if (error.type === ErrorType.NotFound) {
                Response.notFound(res, error);
            }
            else{Response.internalServerError(res, error);}
            
            return;
        }

        Response.ok(res);
    }
}
