// Imports
const prisma = require("../db/client")
const slugify = require("slugify")

const requestController = {
  create: async (req, res) => {
    const authorId = parseInt(req.body.id)
    const items = req.body.items
    const details = req.body.details
    const value = parseFloat(req.body.value)

    // Checks for missing info
    if (isNaN(authorId) || items === "" || isNaN(value)) {
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
      // Create slug based on user name and the actual date
      const slug = slugify(user.fullName + " " + Date.now(), { lower: true })

      const request = await prisma.request.create({
        data: {
          authorId,
          items,
          details,
          value,
          slug,
        },
      })
      res.status(200).json({ msg: "Pedido feito com sucesso", id: request.id })
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
    const value = parseFloat(req.body.value)

    // Checks for missing info
    if (isNaN(id) || items === "" || items === undefined || isNaN(value)) {
      res.status(400).json({ msg: "Informações insuficientes" })
      return
    }

    try {
      // Checks for existing request
      const request = await prisma.request.findUnique({
        where: {
          id,
        },
      })

      if (!request) {
        res.status(400).json({ msg: "Pedido inexistente" })
        return
      }

      await prisma.request.update({
        where: {
          id,
        },
        data: {
          items,
          details,
          value,
        },
      })
      res.status(200).json({ msg: "Pedido atualizado com sucesso" })
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
      // Checks for existing request
      const request = await prisma.request.findUnique({
        where: {
          id,
        },
      })

      if (!request) {
        res.status(400).json({ msg: "Pedido inexistente" })
        return
      }

      await prisma.request.delete({
        where: {
          id,
        },
      })

      res.status(200).json({ msg: "Pedido deletado com sucesso" })
    } catch (err) {
      res.status(500).json(err)
    }
  },

  getByUser: async (req, res) => {
    const jwtCookie = req.signedCookies.jwt

    if (!jwtCookie) {
      res.status(400).json({ msg: "Não possui cookie jwt" })
      return
    }

    try {
      const userRequests = await prisma.request.findMany({
        where: { author: { jwt: jwtCookie } },
        orderBy: { id: 'desc' }
      })

      if (!userRequests) {
        res.status(400).json({ msg: "Não possui nenhum pedido" })
        return
      }

      res.status(200).json(userRequests)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  getBySlug: async (req, res) => {
    const slug = req.params.slug
    const jwtCookie = req.signedCookies.jwt

    if (!jwtCookie || !slug) {
      res.status(400).json({ msg: "Informações insuficientes" })
      return
    }

    try {
      const slugRequest = await prisma.request.findUnique({
        where: { slug },
        include: { author: true },
      })

      if (!slugRequest) {
        res.status(400).json({ msg: "Pedido inexistente" })
        return
      }
  
      res.status(200).json(slugRequest)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  getRequests: async (req, res) => {
    var sort = req.params.sort

    switch (sort) {
      case "null":
        sort = null
        break;
  
      case "false":
        sort = false
        break

      case "true":
        sort = true
        break

      default:
        break;
    }

    try {
      if (sort != null) {
        const requests = await prisma.request.findMany({
          include: { author: true },
          where: { delivered: sort },
        })
        
        res.status(200).json(requests)
        return
      }

      const requests = await prisma.request.findMany({
        include: { author: true }
      })
      res.status(200).json(requests)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  setDelivered: async (req, res) => {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      res.status(400).json({ msg: "ID não especificado" })
      return
    }

    try {
      // Checks for existing request
      const request = await prisma.request.findUnique({
        where: { id },
      })

      if (!request) {
        res.status(400).json({ msg: "Pedido inexistente" })
        return
      }

      const currentState = !request.delivered

      await prisma.request.update({
        where: { id },
        data: { delivered: currentState },
      })

      res.status(200).json({ msg: "Pedido atualizado com sucesso" })
    } catch (err) {
      res.status(500).json(err)
    }
  },
}

module.exports = requestController
