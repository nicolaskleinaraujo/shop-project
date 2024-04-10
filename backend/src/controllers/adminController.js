// Imports
const prisma = require("../db/client")

const adminController = {


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
