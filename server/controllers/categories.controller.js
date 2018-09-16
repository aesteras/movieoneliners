const dbcontext = require("../database/dbcontext")

class CategoriesController {

    async getAll(req, res, next) {
        try {
            res.json(await dbcontext.find("category"))
        } catch (err) {
            res.status(404).json(err)
        }
    }

    async getSingle(req, res, next) {
        let { id } = req.params
        try {
            res.json(await dbcontext.get("category", id))
        } catch (err) {
            res.status(404).json(err) 
        }
    }

    async create(req, res, next) {
        let userCategory = req.body
        try {
            res.json(await dbcontext.create("category", userCategory))
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async update(req, res, next) {
        let { id } = req.params,
            userCategory = req.body
        try {
            let category = await dbcontext.get("category", id)
            res.json(await dbcontext.update(category, userCategory))
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async remove(req, res, next) {
        let { id } = req.params
        try {
            let category = await dbcontext.get("category", id)
            await dbcontext.remove(category)
            res.json(category)
        } catch (err) {
            res.status(500).json(err)
        }
    }

}

module.exports = new CategoriesController()
//
