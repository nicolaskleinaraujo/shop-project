// Modules
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const supertest = require("supertest")
const request = supertest("http://localhost:3000")

// Setup
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

// Tests
describe("Create account routes", () => {
    it("Should create a account", async() => {
        const payload = {
            fullName: "Nicolas Klein Araujo",
            email: "nicolas@gmail.com",
            number: 123456789,
            password: "12345",
            city: "Maringá",
            street: "Av. Juscelino Kubitschek",
            houseNum: 258,
        }

        const res = await request.post("/user/create").send(payload)
        expect(res.statusCode).toBe(200)
    })
})
