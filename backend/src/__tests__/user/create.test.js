// Modules
const app = require("../../app")
const request = require("supertest")(app)

// Setup
let userData

beforeEach(() => {
    userData = {
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
        const test = await request.post("/user/create").send(userData)
        expect(test.statusCode).toBe(200)
    })

    it("Should return a missing info message", async() => {
        userData.fullName = ""
        const test = await request.post("/user/create").send(userData)

        expect(test.body.msg).toBe("Informações insuficientes")
        expect(test.statusCode).toBe(400)
    })

    it("Should return a email or number already cadastered message", async() => {
        await request.post("/user/create").send(userData)
        const test = await request.post("/user/create").send(userData)

        expect(test.body.msg).toBe("Email ou numero já cadastrado")
        expect(test.statusCode).toBe(400)
    })
})
