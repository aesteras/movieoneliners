class Quote {
    
    define(db) {
        db.define("quote", {
            text: {
                type: "text",
                required: true
            },
            character: {
                type: "text",
                required: true
            }
        })
    }

    associate(db) {
        let { quote, movie } = db.models
        quote.hasOne('movie', movie, { autoFetch: true, autoFetchLimit: 2, reverse: "quotes" })
    }
    
}

module.exports = new Quote()
