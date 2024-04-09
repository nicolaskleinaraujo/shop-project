// Imports
const prisma = require("../db/client")

const adminController = {
  getRequests: async (req, res) => {
    try {
      const requests = await prisma.request.findMany()
    } catch (err) {
      res.status(500).json(err)
    }
  },
}

module.exports = adminController
