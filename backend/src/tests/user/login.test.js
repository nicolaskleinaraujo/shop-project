// Modules
const app = require("../../index")
const request = require("supertest")(app)

// Setup
let data = {}

beforeEach(() => {
    data = {
        fullName: "Nicolas Klein Araujo",
        email: `${Date.now()}@gmail.com`,
        number: parseInt(Date.now().toString().slice(-9)),
        password: "12345",
        city: "Maringá",
        street: "Av. Juscelino Kubitschek",
        houseNum: 258,
    }
})

// Tests
describe("Login account route", () => {
    it("Should login with the data provided", async() => {
        await request.post("/user/create").send(data)

        const res = await request.post("/user/login").send(data)
        expect(res.statusCode).toBe(200)
        expect(res.body.msg).toBe("Logado com sucesso")
        expect(res.body.isAdmin).toBe(false)
    })

    it("Should return a missing info message", async() => {
        await request.post("/user/create").send(data)
        data.email = ""

        const res = await request.post("/user/login").send(data)
        expect(res.statusCode).toBe(400)
        expect(res.body.msg).toBe("Informações insuficientes")
    })

    it("Should return a user doesn't exist message", async() => {
        await request.post("/user/create").send(data)
        data.email = "wrongEmail@gmail.com"

        const res = await request.post("/user/login").send(data)
        expect(res.statusCode).toBe(400)
        expect(res.body.msg).toBe("Login incorreto")
    })
})