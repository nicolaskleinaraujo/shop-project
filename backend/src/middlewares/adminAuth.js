// Imports
const prisma = require("../db/client")
const jwt = require("jsonwebtoken")

async function adminAuth(req, res, next) {
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
      where: { jwt: jwtCookie },
    })

    if (!user || !user.isAdmin) {
        res.status(400).json({ msg: "Usuario não autorizado" })
        return
    }

    next()
  } catch (err) {
    res.status(500).json(err)
  }
}
