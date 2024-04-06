// Imports
const jwt = require("jsonwebtoken")

function tryAuth(req, res, next) {
  const jwtCookie = req.cookies.jwt
  const signature = req.signedCookies.jwt

  if (!jwtCookie || !signature) {
    next()
  }

  try {
    const decode = jwt.verify(jwtCookie, process.env.JWT_SECRET)

    if (jwtCookie != signature || !decode) {
      next()
    }

    res.status(200).json({ msg: "Autenticado com sucesso" })
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = tryAuth
