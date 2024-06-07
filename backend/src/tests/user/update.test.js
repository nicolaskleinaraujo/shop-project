// Modules
const app = require("../../index")
const request = require("supertest")(app)
const clearDatabase = require("../../db/clearDatabase")

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
describe("Update account route", () => {
    it("Should update the account infos", async() => {
        await clearDatabase()

        const credentials = await request.post("/user/create").send(data)
        const cookie = credentials.headers['set-cookie']
        data.fullName = "Still a Test"
        data.id = credentials.body.id

        const res = await request.post("/user/update").set("Cookie", cookie).send(data)
        expect(res.statusCode).toBe(200)
    })

    it("Should return a missing info message", async() => {
        await clearDatabase()

        const credentials = await request.post("/user/create").send(data)
        const cookie = credentials.headers['set-cookie']
        data.fullName = ""
        data.id = credentials.body.id

        const res = await request.post("/user/update").set("Cookie", cookie).send(data)
        expect(res.statusCode).toBe(400)
        expect(res.body.msg).toBe("Informações insuficientes")
    })


    it("Should return a email already cadastered message", async() => {
        await clearDatabase()

        await request.post("/user/create").send(data)
        const repeteadEmail = data.email

        data.email = `${Date.now()}@gmail.com`
        data.number = parseInt(Date.now().toString().slice(-9))

        const credentials = await request.post("/user/create").send(data)
        const cookie = credentials.headers['set-cookie']
        data.id = credentials.body.id
        data.email = repeteadEmail

        const res = await request.post("/user/update").set("Cookie", cookie).send(data)
        expect(res.statusCode).toBe(400)
        expect(res.body.msg).toBe("Email já cadastrado")
    })

    /*it("Should return a number already cadastered message", async() => {
        await userController.create(req, res)
        
        req.body.number = 987654321
        req.body.email = "test@gmail.com"
        await userController.create(req, res)


        req.body.id = await res.json.mock.calls[1][0].id
        req.body.number = 123456789
        await userController.update(req, res)

        expect(res.json).toHaveBeenCalledWith({ msg: "Numero já cadastrado" })
        expect(res.status).toHaveBeenCalledWith(400)
    })*/
})
