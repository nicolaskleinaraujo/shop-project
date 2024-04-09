// Imports
const prisma = require("../db/client")
const jwt = require("jsonwebtoken")

async function cookieAuth(req, res, next) {
  const jwtCookie = req.signedCookies.jwt

  if (!jwtCookie) {
    res.status(400).json({ msg: "Não possui cookie jwt" })
    return
  }

  try {
    jwt.verify(jwtCookie, process.env.JWT_SECRET, (err) => {
      if (err) {
        res.status(400).json({ msg: "Cookie não autenticado" })
        return
      }
    })

    const user = await prisma.user.findFirst({
      where: {
        jwt: jwtCookie,
      },
    })

    if (!user) {
      res.status(400).json({ msg: "Usuario não identificado" })
      return
    }

    next()
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = cookieAuth
