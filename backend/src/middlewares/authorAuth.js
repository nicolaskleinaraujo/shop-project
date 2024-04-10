// Imports
const prisma = require("../db/client")
const jwt = require("jsonwebtoken")

async function authorAuth(req, res, next) {
  const jwtCookie = req.signedCookies.jwt
  const requestId = parseInt(req.body.id)

  if (!jwtCookie || !requestId) {
    res.status(400).json({ msg: "Informações insuficientes" })
    return
  }

  try {
    // Check if the jwt have expired
    jwt.verify(jwtCookie, process.env.JWT_SECRET, (err) => {
      if (err) {
        res.status(400).json({ msg: "Cookie não autenticado" })
        return
      }
    })

    // Search and check if the user exist
    const user = await prisma.user.findFirst({
      where: { jwt: jwtCookie },
    })

    if (!user) {
      res.status(400).json({ msg: "Usuario inexistente" })
      return
    }

    // Search and check if the request exist
    const request = await prisma.request.findUnique({
      where: { id: requestId },
    })

    if (!request) {
      res.status(400).json({ msg: "Pedido inexistente" })
    }

    // Checks if the user is the author of the request
    if (user.id != request.authorId) {
        res.status(400).json({ msg: "Não é dono do pedido" })
        return
    }

    next()
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = authorAuth
