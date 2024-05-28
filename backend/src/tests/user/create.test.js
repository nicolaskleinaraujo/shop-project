// Modules
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

    it("Should return a email or number already cadastered message", async() => {
        await request.post("/user/create").send(payload)
        const res = await request.post("/user/create").send(payload)

        expect(res.body.msg).toBe("Email ou numero já cadastrado")
        expect(res.statusCode).toBe(400)
    })
})
