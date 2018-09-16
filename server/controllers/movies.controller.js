const dbcontext = require("../database/dbcontext")

class MoviesController {

    async getAll(req, res, next) {
        try {
            res.json(await dbcontext.find("movie"))
        } catch (err) {
            res.status(404).json(err)
        }
    }

    async getSingle(req, res, next) {
        let { id } = req.params
        try {
            res.json(await dbcontext.get("movie", id))
        } catch (err) {
            res.status(404).json(err) 
        }
    }

    async create(req, res, next) {
        let userMovie = req.body
        try {
            res.json(await dbcontext.create("movie", userMovie))
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async update(req, res, next) {
        let { id } = req.params,
            userMovie = req.body
        try {
            let movie = await dbcontext.get("movie", id)
            res.json(await dbcontext.update(movie, userMovie))
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async remove(req, res, next) {
        let { id } = req.params
        try {
            let movie = await dbcontext.get("movie", id)
            await dbcontext.remove(movie)
            res.json(movie)
        } catch (err) {
            res.status(500).json(err)
        }
    }

}

module.exports = new MoviesController()
//
