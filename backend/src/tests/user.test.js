// Modules
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const supertest = require("supertest")
const request = supertest("http://localhost:3000")

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
        updatePayload.email = payload.email

        const res = await request.post("/user/update").send(updatePayload).set("Cookie", cookie)
        expect(res.body.msg).toBe("Email já cadastrado")
        expect(res.statusCode).toBe(400)

        updatePayload.email = "test@gmail.com"
    })

    it("Should return a number already cadastered message", async() => {
        await request.post("/user/create").send(payload)
        updatePayload.id = id
        updatePayload.number = payload.number

        const res = await request.post("/user/update").send(updatePayload).set("Cookie", cookie)
        expect(res.body.msg).toBe("Numero já cadastrado")
        expect(res.statusCode).toBe(400)
    })
})
