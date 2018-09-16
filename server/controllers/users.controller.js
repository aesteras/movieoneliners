const   dbcontext = require("../database/dbcontext")

class UsersController {

    async getAll(req, res, next) {
        try {
            res.json(await dbcontext.find("user"))
        } catch (err) {
            res.status(404).json(err)
        }
    }

    async getSingle(req, res, next) {
        let { id } = req.params
        try {
            res.json(await dbcontext.get("user", id))
        } catch (err) {
            res.status(404).json(err) 
        }
    }

    async create(req, res, next) {
        let userUser = req.body
        try {
            res.json(await dbcontext.create("user", userUser))

        } catch (err) {
            res.status(500).json(err)
        }
    }

    async update(req, res, next) {
        let { id } = req.params,
            userUser = req.body
        try {
            let user = await dbcontext.get("user", id)
            res.json(await dbcontext.update(user, userUser))
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async remove(req, res, next) {
        let { id } = req.params
        try {
            let user = await dbcontext.get("user", id)
            await dbcontext.remove(user)
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    }

}

module.exports = new UsersController()
