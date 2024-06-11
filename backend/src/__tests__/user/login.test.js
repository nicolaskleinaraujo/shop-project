// Modules
const app = require("../../app")
const request = require("supertest")(app)

// Setup
let userData

beforeEach(async() => {
    userData = {
        fullName: "Nicolas Klein Araujo",
        email: `${Date.now()}@gmail.com`,
        number: parseInt(Date.now().toString().slice(-9)),
        password: "12345",
        city: "Maringá",
        street: "Av. Juscelino Kubitschek",
        houseNum: 258,
    }

    // Creating new user
    await request.post("/user/create").send(userData)
})

// Tests
describe("Login account route", () => {
    it("Should login with the data provided", async() => {
        const test = await request.post("/user/login").send(userData)
        expect(test.statusCode).toBe(200)
        expect(test.body.msg).toBe("Logado com sucesso")
        expect(test.body.isAdmin).toBe(false)
    })

    it("Should return a missing info message", async() => {
        userData.email = ""

        const test = await request.post("/user/login").send(userData)
        expect(test.statusCode).toBe(400)
        expect(test.body.msg).toBe("Informações insuficientes")
    })

    it("Should return a user doesn't exist message", async() => {
        userData.email = "wrongEmail@gmail.com"

        const test = await request.post("/user/login").send(userData)
        expect(test.statusCode).toBe(400)
        expect(test.body.msg).toBe("Login incorreto")
    })

    it("Should return a password doesn't match message", async() => {
        userData.password = "wrongPassword"

        const test = await request.post("/user/login").send(userData)
        expect(test.statusCode).toBe(400)
        expect(test.body.msg).toBe("Login incorreto")
    })
})