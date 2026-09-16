export default class User {
    constructor(id, userName, password) {
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
    
    updateFrom(otherUser) {
        this.id = otherUser.id;
        this.userName = otherUser.userName;
        this.password = otherUser.password;
    }
}
