// Imports
const prisma = require("../db/client")

const adminController = {
  getRequests: async (req, res) => {
    try {
      const requests = await prisma.request.findMany()
      res.status(200).json(requests)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany()
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json(err)
    }
  },
}

module.exports = adminController
