// Modules
const app = require("../../index")
const request = require("supertest")(app)

// Setup
let data = {}

beforeEach(() => {
    data = {
        fullName: "Nicolas Klein Araujo",
        email: "nicolas@gmail.com",
        number: 123456789,
        password: "12345",
        city: "Maringá",
        street: "Av. Juscelino Kubitschek",
        houseNum: 258,
    }
})

// Tests
describe("User controller create function", () => {
    it("Should create a account", async() => {
        const res = await request.post("/user/create").send(data)
        expect(res.statusCode).toBe(200)
    })

    it("Should return a missing info message", async() => {
        data.fullName = ""
        const res = await request.post("/user/create").send(data)

        expect(res.body.msg).toBe("Informações insuficientes")
        expect(res.statusCode).toBe(400)
    })

    it("Should return a email or number already cadastered message", async() => {
        await request.post("/user/create").send(data)
        const res = await request.post("/user/create").send(data)

        expect(res.body.msg).toBe("Email ou numero já cadastrado")
        expect(res.statusCode).toBe(400)
    })
})
