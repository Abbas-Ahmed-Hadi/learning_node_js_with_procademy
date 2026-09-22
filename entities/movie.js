export default class Movie {

    constructor(id, name, description, duration, rating,
        totalRating, releaseYear, releaseDate, createdAt,
        geners, directors, coverImage, actors, price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.rating = rating;
        this.totalRating = totalRating;
        this.releaseYear = releaseYear;
        this.releaseDate = releaseDate;
        this.createdAt = createdAt;
        this.geners = geners;
        this.directors = directors;
        this.coverImage = coverImage;
        this.actors = actors;
        this.price = price;
    }

    updateFrom(other) {
        this.id = other.id;
        this.name = other.name;
        this.description = other.description;
        this.duration = other.duration;
        this.rating = other.rating;
        this.totalRating = other.totalRating;
        this.releaseYear = other.releaseYear;
        this.releaseDate = other.releaseDate;
        this.createdAt = other.createdAt;
        this.geners = other.geners;
        this.directors = other.directors;
        this.coverImage = other.coverImage;
        this.actors = other.actors;
        this.price = other.price;
    }

    clone() {
        return new Movie(
            this.id,
            this.name,
            this.description,
            this.duration,
            this.rating,
            this.totalRating,
            this.releaseYear,
            this.releaseDate,
            this.createdAt,
            this.geners,
            this.directors,
            this.coverImage,
            this.actors,
            this.price);
    }

    static Copy(other) {
        return new Movie(
            other.id,
            other.name,
            other.description,
            other.duration,
            other.rating,
            other.totalRating,
            other.releaseYear,
            other.releaseDate,
            other.createdAt,
            other.geners,
            other.directors,
            other.coverImage,
            other.actors,
            other.price);
    }
}