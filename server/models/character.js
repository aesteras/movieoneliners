class Character {

    define(db) {
        db.define("character", {
            name: {
                type: "text",
                required: true,
                unique: true
            },
            movie: {
                type: "text"
            }
        })
    }
}

module.exports = new Category()
