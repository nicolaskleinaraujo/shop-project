// Imports
const prisma = require("../db/client")

const itemController = {
  create: async (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const value = parseFloat(req.body.value)

    if (
      name === "" ||
      name === undefined ||
      description === "" ||
      description === undefined ||
      isNaN(value)
    ) {
      res.status(400).json({ msg: "Informações insuficientes" })
      return
    }

    try {
      await prisma.item.create({
        data: {
          name,
          description,
          value,
        },
      })
      res.status(200).json({ msg: `${name} criado com sucesso` })
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
      const item = await prisma.item.findUnique({
        where: { id },
      })

      if (!item) {
        res.status(400).json({ msg: "Item inexistente" })
        return
      }

      res.status(200).json(item)
    } catch (err) {
      res.status(500).json(err)
    }
  },
}

module.exports = itemController
