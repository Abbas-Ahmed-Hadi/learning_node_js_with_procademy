export default class User {
    
    constructor(id, userName, password) {
        this.id = id;
        this.userName = userName;
        this.password = password;
    }
    
    updateFrom(other) {
        this.id = other.id;
        this.userName = other.userName;
        this.password = other.password;
    }
    
    clone() {
        return new User(
            this.id,
            this.userName,
            this.password);
    }
    
    static Copy(other) {
        return new User(
            other.id,
            other.userName,
            other.password);
    }
}