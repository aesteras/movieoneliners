const   dbcontext = require("../database/dbcontext")
        httpResponse = require("../utils/httpResponse")

class QuotesController {

    async getAll(req, res, next) {
        let { categoryId, character } = req.query,
            where = {}
        if (categoryId) where.category_id = categoryId
        if (character) where.character = character
        try {
            let quotes = await dbcontext.find("quote", where)
            if (!quotes.length) httpResponse.notFound(res, "Resource not found")
            else httpResponse.ok(res, quotes)
        } catch (err) {
            if (err.type === "validation") httpResponse.badRequest(res, err)
            httpResponse.badRequest(res, err)
        }
    }

    async getSingle(req, res, next) {
        let { id } = req.params
        try {
            res.json(await dbcontext.get("quote", id))
        } catch (err) {
            httpResponse.notFound(res, err)
        }
    }

    async create(req, res, next) {
        let userQuote = req.body
        delete userQuote.id
        delete userQuote.category
        try {
            httpResponse.ok(res, await dbcontext.create("quote", userQuote))
        } catch (err) {
            if (err.type === "validation") httpResponse.badRequest(res, err)
            httpResponse.error(res, err)
        }
    }

    async update(req, res, next) {
        let { id } = req.params,
            userQuote = req.body
        delete userQuote.id
        delete userQuote.category
        try {
            let quote = await dbcontext.get("quote", id)
            httpResponse.ok(res, await dbcontext.update(quote, userQuote))
        } catch (err) {
            httpResponse.error(res, err)
        }
    }

    async remove(req, res, next) {
        let { id } = req.params
        try {
            let quote = await dbcontext.get("quote", id)
            await dbcontext.remove(quote)
            httpResponse.ok(res, quote)
        } catch (err) {
            httpResponse.error(res, err)
        }
    }

}

module.exports = new QuotesController()
//
