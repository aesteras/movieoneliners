/**
 * Create and configures the Node Server.
 */

const   express = require("express"),
        http = require("http")
        bodyParser = require("body-parser")
        cookieParser = require("cookie-parser")
        path = require("path")

const   router = require("./router")
        dbcontext = require("./database/dbcontext")

class Server {

    constructor() {
        this.init()
    }
    
    init() {
        this.app = express()
        this.app.use(bodyParser.json())
        this.app.use(cookieParser())
        this.app.use(express.static(path.join(__dirname, "./public")))
        this.app.use("/api", router)
        // Redirect to the client router
        this.app.use(
            (req, res) => res.sendFile(path.join(__dirname, "./public/index.html"))
        )
    }

    start(port = 3000) {
        // Adding app port and starting server
        this.app.set('port', port)
        let server = http.createServer(this.app)
        server.listen(port)
        server.on("listening", () => console.log(`Server listening on ${ "port " + server.address().port || server.address() }.`)
        )
    }
    
}

module.exports = Server
