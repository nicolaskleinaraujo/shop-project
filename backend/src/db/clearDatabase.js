const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const clearDatabase = async() => {
    await prisma.request.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.item.deleteMany({})
}

module.exports = clearDatabase
