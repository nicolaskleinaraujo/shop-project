// Imports
const prisma = require("../db/client")

const itemController = {
  create: async (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const value = parseInt(req.body.value)

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
      prisma.item.create({
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
}

module.exports = itemController
