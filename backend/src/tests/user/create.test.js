// Modules
const supertest = require("supertest")
const app = require("../../index")
const request = supertest(app)

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
        req.body.fullName = ""
        await userController.create(req, res)

        expect(res.json).toHaveBeenCalledWith({msg: "Informações insuficientes"})
        expect(res.status).toHaveBeenCalledWith(400)
    })

    it("Should return a email or number already cadastered message", async() => {
        await userController.create(req, res)
        await userController.create(req, res)

        expect(res.json).toHaveBeenCalledWith({msg: "Email ou numero já cadastrado"})
        expect(res.status).toHaveBeenCalledWith(400)
    })
})
