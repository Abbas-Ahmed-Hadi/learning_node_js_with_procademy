export default class User {
    
    static #ObjectFieldsNames = [
        "name", "email", "photo",
        "password", "confirmPassword"
    ];
    
    // @info each string attribute with its:
    // Name, MinimumLength, MaximumLength
    static #StringTypeFieldsValidationInfo = [
        ["name", 3, 35],
        ["email", 8, 100],
        ["password", 8, 40],
        ["confirmPassword", 8, 40]
    ];
    
    static get FieldsNames() {
        return User.#ObjectFieldsNames;
    }
    
    static get StringTypeFieldsValidationInfo() {
        return User.#StringTypeFieldsValidationInfo;
    }
    
    
    constructor(id, name, email, password, 
        confirmPassword, photo = null) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.photo = photo;
    }
    
    updateFrom(other) {
        this.id = other.id;
        this.name = other.name;
        this.email = other.email;
        this.password = other.password;
        this.confirmPassword = other.confirmPassword;
        this.photo = other.photo;
    }
    
    clone() {
        return new User(
            this.id,
            this.name,
            this.email,
            this.password,
            this.confirmPassword,
            this.photo);
    }
    
    static Copy(other) {
        return new User(
            other.id,
            other.name,
            other.email,
            other.password,
            other.confirmPassword,
            other.photo);
    }
}