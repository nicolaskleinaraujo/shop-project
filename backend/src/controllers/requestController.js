// Imports
const prisma = require("../db/client")
const slugify = require("slugify")

const requestController = {
  create: async (req, res) => {
    const authorId = parseInt(req.body.id)
    const items = req.body.items
    const details = req.body.details

    // Checks if some info is missing
    if (isNaN(authorId) || items === "") {
      res.status(400).json({ msg: "Informações insuficientes" })
      return
    }

    // Checks for existing user
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

  getById: async (req, res) => {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      res.status(400).json({ msg: "ID não especificado" })
      return
    }

    try {
      const request = await prisma.request.findUnique({
        where: {
          id,
        },
        include: {
          author: true,
        },
      })

      if (!request) {
        res.status(400).json({ msg: "Pedido inexistente" })
        return
      }

      res.status(200).json(request)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  update: async (req, res) => {
    const id = parseInt(req.body.id)
    const items = req.body.items
    const details = req.body.details

    if (isNaN(id) || items === "") {
      res.status(400).json({ msg: "Informações insuficientes" })
      return
    }

    try {
      await prisma.request.update({
        where: {
          id,
        },
        data: {
          items,
          details,
        },
      })
      res.status(200).json({ msg: "Pedido atualizado com sucesso" })
    } catch (err) {
      res.status(500).json(err)
    }
  },
}

module.exports = requestController
