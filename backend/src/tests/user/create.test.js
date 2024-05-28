// Modules
const userController = require("../../controllers/userController")

// Setup
let req = {}
let res = {}

beforeEach(() => {
    req = {
        body: {
            fullName: "Nicolas Klein Araujo",
            email: "nicolas@gmail.com",
            number: 123456789,
            password: "12345",
            city: "Maringá",
            street: "Av. Juscelino Kubitschek",
            houseNum: 258,
        }
    }

    res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        cookie: jest.fn(),
    }
})

// Tests
describe("User controller create function", () => {
    it("Should create a account", async() => {
        await userController.create(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
    })

    it("Should return a missing info message", async() => {
        req.body.fullName = ""
        await userController.create(req, res)

        expect(res.json).toHaveBeenCalledWith({msg: "Informações insuficientes"})
        expect(res.status).toHaveBeenCalledWith(400)
    })

    it("Should return a email or number already cadastered message", async() => {
        await request.post("/user/create").send(payload)
        const res = await request.post("/user/create").send(payload)

        expect(res.body.msg).toBe("Email ou numero já cadastrado")
        expect(res.statusCode).toBe(400)
    })
})
