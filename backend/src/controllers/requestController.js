// Imports
const prisma = require("../db/client")
const slugify = require("slugify")

const requestController = {
  create: async (req, res) => {
    const authorId = parseInt(req.body.id)
    const items = req.body.items
    const details = req.body.details

    if (isNaN(authorId) || items === "") {
      res.status(400).json({ msg: "Informações insuficientes" })
      return
    }

    const user = await prisma.user.findUnique({
      where: {
        id: authorId,
      },
    })

    if (!user) {
      res.status(400).json({ msg: "Usuario inexistente" })
      return
    }

    try {
      const slug = slugify(user.fullName + " " + Date.now(), { lower: true })
      await prisma.request.create({
        data: {
          authorId,
          items,
          details,
          slug,
        },
      })
      res.status(200).json({ msg: "Pedido feito com sucesso" })
    } catch (err) {
      res.status(500).json(err)
    }
  },
}

module.exports = requestController
