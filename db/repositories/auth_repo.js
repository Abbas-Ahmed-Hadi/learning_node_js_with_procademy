import UsersModule from "./../modules/users_module.js";
import UsersRepository from "./users_repo.js";

export default class AuthRepository {
    
    async singUp(userInfo) {
        const userRepo = new UsersRepository();
        return userRepo.addUser(userInfo);
    }
    
    async logIn(email, password) {
        try {
        const userDataDoc = await UsersModule.Module
            .find({ email, password })
            .select("-__v -password -confirmPassword");
            
            return {
                id: userDataDoc._id.toString(),
                name: userDataDoc.name,
                email: userDataDoc.email,
                photo: userDataDoc.photo
            };
        } catch (err) {
            console.log("An Error Occur:", err.meassage);
            return null;
        }
    }
}