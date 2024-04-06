// Imports
const jwt = require("jsonwebtoken")

function tryAuth(req, res, next) {
    const jwtCookie = req.cookies.jwt

    try {
        const decode = jwt.verify(jwtCookie, process.env.JWT_SECRET)

        if (!decode) {
            next()
        }

        res.status(200).json({ msg: "Autenticado com sucesso" })
    } catch (err) {
        res.status(500).json(err)
    }
}