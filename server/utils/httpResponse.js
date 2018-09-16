/**
 * Handles HTTP status codes and responses.
 */

class HttpResponse {
    
    ok(res, data) {
        return res.status(200).json(data)
    }

    error(res, msg) {
        if (process.env.ENV === "development") res.status(msg.status || 500).json(msg)
        else res.status(msg.status || 500).json("Internal server error.")
    }

    badRequest(res, msg = "Bad request. Wrong parameters.") {
        res.status(400).json({ msg })
    }

    unauthorized(res, msg = "Unauthorized. Invalid credentials.") {
        res.status(401).json({ msg })
    }

    forbidden(res, msg = "Forbidden. Authentication needed.") {
        res.status(403).json({ msg })
    }

    notFound(res, msg = "Resource not found.") {
        res.status(404).json({ msg })
    }

}

module.exports = new HttpResponse()
