// Modules
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const supertest = require("supertest")
const request = supertest("http://localhost:3000")

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
    await prisma.$disconnect()
})

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

    it("Should return a missing info message", async() => {
        const payload = {
            fullName: "Nicolas Klein Araujo"
        }

        const res = await request.post("/user/create").send(payload)
        expect(res.body.msg).toBe("Informações insuficientes")
        expect(res.statusCode).toBe(400)
    })

    it("Should return a email already cadastered message", async() => {
        const payload = {
            fullName: "Nicolas Klein Araujo",
            email: "nicolas@gmail.com",
            number: 123456789,
            password: "12345",
            city: "Maringá",
            street: "Av. Juscelino Kubitschek",
            houseNum: 258,
        }

        await request.post("/user/create").send(payload)
        const res = await request.post("/user/create").send(payload)

        expect(res.body.msg).toBe("Email ou numero já cadastrado")
        expect(res.statusCode).toBe(400)
    })
})
