class Movie {
    
    define(db) {
        db.define("movie", {
            title: {
                type: "text",
                required: true
            },
            year: {
                type: "integer",
                required: true
            },
            director: {
                type: "text"
            },
            image: {
                type: "text"
            }
        })
    }

    associate(db) {
        let { movie, category } = db.models
        movie.hasOne('category', category, { autoFetch: true, reverse: "movies" })
    }
    
}

module.exports = new Movie()
