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
    jwt.verify(jwtCookie, process.env.JWT_SECRET, (err) => {
      if (err) {
        res.status(400).json({ msg: "Cookie não autenticado" })
        return
      }
    })

    const user = await prisma.user.findFirst({
      where: { jwt: jwtCookie },
    })

    if (!user) {
      res.status(400).json({ msg: "Usuario inexistente" })
      return
    }

    const request = await prisma.request.findUnique({
      where: { id: requestId },
    })

    if (!request) {
      res.status(400).json({ msg: "Pedido inexistente" })
    }

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
