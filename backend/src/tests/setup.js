// Modules
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const supertest = require("supertest")
const request = supertest("http://localhost:3000")

// Setup
let cookie = ""
let id = 0

beforeAll(async() => {
    await prisma.$connect()
})

beforeEach(async() => {
    await prisma.request.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.item.deleteMany({})

    // This user is used on the "update account" tests
    const payload = {
        fullName: "test",
        email: "test@gmail.com",
        number: 123,
        password: "12345",
        city: "test",
        street: "test",
        houseNum: 258,
    }

    const res = await request.post("/user/create").send(payload)
    cookie = res.headers['set-cookie']
    id = res.body.id
})

afterAll(async() => {
    prisma.$disconnect()
})