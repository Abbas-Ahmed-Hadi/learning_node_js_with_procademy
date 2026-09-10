export default class User {
    constructor(id = 0, userName = "", password = "") {
        this.id = id;
        this.userName = userName;
        this.password = password;
    }
    
    static From(user) {
        return new User(
            user.id,
            user.userName,
            user.password
        );
    }
    
    updateFrom(user) {
        this.id = user.id;
        this.userName = user.userName;
        this.password = user.password;
    }
}
