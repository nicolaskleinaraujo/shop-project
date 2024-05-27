const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

beforeAll(async() => {
    prisma.$connect()
})

beforeEach(async() => {
    prisma.request.deleteMany({})
    prisma.user.deleteMany({})
    prisma.item.deleteMany({})
})

afterAll(async() => {
    prisma.$disconnect()
})
