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
    await prisma.$disconnect()
})

// Tests
describe("Create account routes", () => {
    const payload = {
        fullName: "Nicolas Klein Araujo",
        email: "nicolas@gmail.com",
        number: 123456789,
        password: "12345",
        city: "Maringá",
        street: "Av. Juscelino Kubitschek",
        houseNum: 258,
    }

    it("Should create a account", async() => {
        const res = await request.post("/user/create").send(payload)
        expect(res.statusCode).toBe(200)
    })

    it("Should return a missing info message", async() => {
        const res = await request.post("/user/create").send(payload.fullName)
        
        expect(res.body.msg).toBe("Informações insuficientes")
        expect(res.statusCode).toBe(400)
    })

    it("Should return a email already cadastered message", async() => {
        await request.post("/user/create").send(payload)
        const res = await request.post("/user/create").send(payload)

        expect(res.body.msg).toBe("Email ou numero já cadastrado")
        expect(res.statusCode).toBe(400)
    })
})

describe("Update account route", () => {
    const payload = {
        fullName: "Nicolas Klein Araujo",
        email: "nicolas@gmail.com",
        number: 123456789,
        password: "12345",
        city: "Maringá",
        street: "Av. Juscelino Kubitschek",
        houseNum: 258,
    }

    const updatePayload = {
        id,
        fullName: "Still a Test",
        email: "test@gmail.com",
        number: 123,
        password: "12345",
        city: "Maringá",
        street: "Av. Juscelino Kubitschek",
        houseNum: 852,
    }

    it("Should update the account infos", async() => {
        updatePayload.id = id
        const res = await request.post("/user/update").send(updatePayload).set("Cookie", cookie)

        expect(res.statusCode).toBe(200)
    })

    it("Should return a missing info message", async() => {
        updatePayload.id = id
        const res = await request.post("/user/update").send(updatePayload.fullName).set("Cookie", cookie)

        expect(res.body.msg).toBe("Informações insuficientes")
        expect(res.statusCode).toBe(400)
    })

    it("Should return a email already cadastered message", async() => {
        await request.post("/user/create").send(payload)
        updatePayload.id = id
        updatePayload.email = "nicolas@gmail.com"

        const res = await request.post("/user/update").send(updatePayload).set("Cookie", cookie)
        expect(res.body.msg).toBe("Email já cadastrado")
        expect(res.statusCode).toBe(400)
    })
})
