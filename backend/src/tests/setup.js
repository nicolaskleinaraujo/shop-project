// Modules
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// Setup
beforeAll(async() => {
    await prisma.$connect()
})

beforeEach(async() => {
    await prisma.request.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.item.deleteMany({})
})

afterAll(async() => {
    prisma.$disconnect()
})