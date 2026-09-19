export default class Movie {
    
    constructor(id, name, description, duration, rating) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.rating = rating;
    }

    updateFrom(other) {
        this.id = other.id;
        this.name = other.name;
        this.description = other.description;
        this.duration = other.duration;
        this.rating = other.rating;
    }
    
    clone() {
        return new Movie(
            this.id,
            this.name,
            this.description,
            this.duration,
            this.rating);
    }
    
    static Copy(other) {
        return new Movie(
            other.id,
            other.name,
            other.description,
            other.duration,
            other.rating);
    }
}