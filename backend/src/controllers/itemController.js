// Imports
const prisma = require("../db/client")

const itemController = {
    create: async (req, res) => {
        const name = req.body.name
        const description = req.body.description
        const value = parseInt(req.body.value)

        
    }
}

module.exports = itemController