/**
 * Create all the available routes for the API and
 * relate them to the controller's middleware.
 */

const   express = require("express")

const   categoriesController = require("./controllers/categories.controller"),
        moviesController = require("./controllers/movies.controller"),
        quotesController = require("./controllers/quotes.controller"),
        usersController = require("./controllers/users.controller"),
        authController = require("./controllers/auth.controller")

class Router {

    constructor() {
        this.router = express.Router()
        this.addRoutes()
    }

    addRoutes() {

        // AUTH

        this.router.post("/login", authController.login)
        this.router.post("/signin", authController.signin)
        this.router.post("/logout", authController.logout)

        // CATEGORIES

        this.router.route("/categories")
            .get(categoriesController.getAll)
            .post(authController.authenticate, categoriesController.create)
        this.router.route("/categories/:id")
            .get(categoriesController.getSingle)
            .put(authController.authenticate, categoriesController.update)
            .delete(authController.authenticate, categoriesController.remove)
            
        // MOVIES

        this.router.route("/movies")
            .get(moviesController.getAll)
            .post(authController.authenticate, moviesController.create)
        this.router.route("/movies/:id")
            .get(moviesController.getSingle)
            .put(authController.authenticate, moviesController.update)
            .delete(authController.authenticate, moviesController.remove)
            
        // QUOTES

        this.router.route("/quotes")
            .get(quotesController.getAll)
            .post(authController.authenticate, quotesController.create)
        this.router.route("/quotes/:id")
            .get(quotesController.getSingle)
            .put(authController.authenticate, quotesController.update)
            .delete(authController.authenticate, quotesController.remove)
            
        // USERS

        this.router.route("/users")
            .get(authController.authenticate, usersController.getAll)
            .post(usersController.create)
        this.router.route("/users/:id")
            .get(authController.authenticate, usersController.getSingle)
            .put(authController.authenticate, usersController.update)
            .delete(authController.authenticate, usersController.remove)

        // IMAGES
        this.router.route("/images/:filename")
            .get((req, res) => {
                try {
                    let { filename } = req.params
                    res.sendFile(path.join(__dirname, "/public/images/", filename))
                } catch (err) {
                    res.status(404).json(err) 
                }
            })

    }
    
}

module.exports = new Router().router
