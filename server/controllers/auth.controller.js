const   bcrypt = require("bcrypt-nodejs"),
        jwt = require("jsonwebtoken"),
        { promisify}  = require("util"),
        nodemailer = require("nodemailer")

const   dbcontext = require("../database/dbcontext"),
        httpResponse = require("../utils/httpResponse")

let _generateToken = function(email) {
    return jwt.sign(
        { email },
        process.env.SERVER_PRIVATE_KEY,
        { expiresIn: "7 days" }
    )
}

class AuthController {
    
    async authenticate(req, res, next) {
        let token = req.cookies["api-token"]
        if(!token) return httpResponse.unauthorized(res)
        let verify = promisify(jwt.verify)
        try {
            let decoded = await verify(token, process.env.SERVER_PRIVATE_KEY)
            let users = await dbcontext.find("user", { email: decoded.email })
            if (!users.length) return httpResponse.unauthorized(res, e)
            req.loggedUser = users[0]
            next()
        }
        catch (err) {
            httpResponse.unauthorized(res, err)
        }
    }
    
    async login(req, res) {
         let { email, password } = req.body
            try {
                let users = await dbcontext.find("user", { email })
                if (!users.length || !bcrypt.compareSync(password, users[0].password)) {
                    return httpResponse.unauthorized(res)
                }
                let token =  _generateToken(users[0].email)
                res.cookie("api-token", token)
                return httpResponse.ok(res, { token })
            }
            catch (err) {
                httpResponse.error(res, err)
            }
    }
    
    async logout(req, res) {
        res.clearCookie("api-token")
        return httpResponse.ok(res)
    }

    async signin(req, res) {
        let { email, password, password2 } = req.body
        let isAdmin = false
        try {
            let users = await dbcontext.find("user", { email })
            if (users.length || password != password2) {
                httpResponse.unauthorized(res)
            } else {
                await dbcontext.create("user", { email, password, isAdmin })
                let token =  _generateToken(email)
                res.cookie("api-token", token)
                return httpResponse.ok(res, { token })
            }
        } catch (err) {
            httpResponse.unauthorized(res, err)
        }
    }

}

module.exports = new AuthController()
