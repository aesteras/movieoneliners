/**
 * Configures the database and works as an interface for Node ORM.
 */

const   orm = require("orm"),
        { promisify } = require("util")

const   category = require("../models/category"),
        movie = require("../models/movie"),
        quote = require("../models/quote"),
        user = require("../models/user"),
        categorySeeds = require("./seeds/categories.seed"),
        movieSeeds = require("./seeds/movies.seed"),
        quoteSeeds = require("./seeds/quotes.seed"),
        userSeeds = require("./seeds/users.seed")

class Dbcontext {

    constructor() {
        this.init()
    }

    _connect(connectionString) {
        let connect = promisify(orm.connect)
        return connect(connectionString)
    }

    _drop() {
        return new Promise((resolve, reject) => {
            this.db.drop(err => {
                if (err) reject(err)
                else resolve()
            })
        })
    }

    _sync() {
        return new Promise((resolve, reject) => {
            this.db.sync(err => {
                if (err) reject(err)
                else resolve()
            })
        })
    }

    async init() {
        
        try {
            // Connecting to the database
            this.db = await this._connect(process.env.DB_CONNECTION_STRING)
            console.log("- Database connected successfully.")
        } catch (err) {
            console.error("Error connecting database.")
            return console.error(err)
        }

        // Defining database models
        category.define(this.db)
        movie.define(this.db)
        quote.define(this.db)
        user.define(this.db)

        // Defining database relationships
        movie.associate(this.db)
        quote.associate(this.db)

        // Dropping database (if on development)
        if (process.env.ENV === 'development') {
            try {
                await this._drop()
                console.log("- Database dropped successfully.")
            } catch (err) {
                console.error("Error dropping database.")
                return console.error(err)
            }
        }

        try {
            // Syncing database and creating tables
            await this._sync()
            console.log("- Models synced successfully.")
        } catch (err) {
            console.error("Error syncing models.")
            return console.error(err)
        }

        // Seeding all models concurrently (if on development)
        if (process.env.ENV === 'development') {
            try {
                await this.create("category", categorySeeds)
                await this.create("movie", movieSeeds)
                await Promise.all([
                    this.create("quote", quoteSeeds),
                    this.create("user", userSeeds)
                ])
                console.log("- Models seeded successfully.")
            } catch (err) {
                console.error("Error seeding models.")
                return console.error(err)
            }
        }

    }

    get(model, id) {
        let get = promisify(this.db.models[model].get)
        return get(id)
    }

    find(model, where) {
        let find = promisify(this.db.models[model].find)
        return find(where)
    }

    create(model, data) {
        let create = promisify(this.db.models[model].create)
        return create(data)
    }

    update(model, data) {
        return new Promise( (resolve, reject) => {
            model.save(data, (err, newQuote) => {
                if (err) reject(err)
                else resolve(newQuote)
            })
        })
    }

    remove(model) {
        let remove = promisify(model.remove)
        return remove()
    }
    
}

module.exports = new Dbcontext()
