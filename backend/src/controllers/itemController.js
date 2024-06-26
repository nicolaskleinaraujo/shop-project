// Imports
const prisma = require("../db/client")

const itemController = {
  create: async (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const value = parseFloat(req.body.value)

    // Checks for missing info
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
      const item = await prisma.item.create({
        data: {
          name,
          description,
          value,
        },
      })
      res.status(200).json({ msg: `${name} criado com sucesso`, id: item.id })
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
      // Checks for existing item
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

  update: async (req, res) => {
    const id = parseInt(req.body.id)
    const name = req.body.name
    const description = req.body.description
    const value = parseFloat(req.body.value)

    // Checks for missing info
    if (
      isNaN(id) ||
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
      // Update item based on his id
      const item = await prisma.item.update({
        where: { id },
        data: {
          name,
          description,
          value,
        },
      })
      res.status(200).json({ msg: `${name} atualizado com sucesso`, id: item.id })
    } catch (err) {
      res.status(500).json(err)
    }
  },

  delete: async (req, res) => {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      res.status(400).json({ msg: "ID não especificado" })
      return
    }

    try {
      // Find and delete item by his id
      const item = await prisma.item.findUnique({
        where: { id },
      })

      if (!item) {
        res.status(400).json({ msg: "Item inexistente" })
        return
      }

      await prisma.item.delete({
        where: { id },
      })

      res.status(200).json({ msg: "item deletado com sucesso" })
    } catch (err) {
      res.status(500).json(err)
    }
  },

  getAll: async (req, res) => {
    try {
      const items = await prisma.item.findMany()
      res.status(200).json(items)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = itemController
