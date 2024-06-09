// Modules
const app = require("../../app")
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
describe("Update account route", () => {
    it("Should update the account infos", async() => {
        const credentials = await request.post("/user/create").send(data)
        const cookie = credentials.headers['set-cookie']
        data.fullName = "Still a Test"
        data.id = credentials.body.id

        const res = await request.post("/user/update").set("Cookie", cookie).send(data)
        expect(res.statusCode).toBe(200)
    })

    it("Should return a missing info message", async() => {
        const credentials = await request.post("/user/create").send(data)
        const cookie = credentials.headers['set-cookie']
        data.fullName = ""
        data.id = credentials.body.id

        const res = await request.post("/user/update").set("Cookie", cookie).send(data)
        expect(res.statusCode).toBe(400)
        expect(res.body.msg).toBe("Informações insuficientes")
    })


    it("Should return a email already cadastered message", async() => {
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

    it("Should return a number already cadastered message", async() => {
        await request.post("/user/create").send(data)
        const repeteadNumber = data.number

        data.email = `${Date.now()}@gmail.com`
        data.number = parseInt(Date.now().toString().slice(-9))

        const credentials = await request.post("/user/create").send(data)
        const cookie = credentials.headers['set-cookie']
        data.id = credentials.body.id
        data.number = repeteadNumber

        const res = await request.post("/user/update").set("Cookie", cookie).send(data)
        expect(res.statusCode).toBe(400)
        expect(res.body.msg).toBe("Numero já cadastrado")
    })
})
