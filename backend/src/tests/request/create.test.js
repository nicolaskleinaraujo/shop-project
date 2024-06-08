// Modules
const app = require("../../index")
const request = require("supertest")(app)

// Setup
let requestData = {}
let userData = {}

beforeEach(() => {
    requestData = {
        items: "Cheesecake, Pancake",
        details: "Lactose-free pancake",
        value: 15.99,
    }

    userData = {
        fullName: "Admin User",
        email: "admin@gmail.com",
        number: 123456789,
        password: "12345",
        city: "Admin City",
        street: "Admin Street",
        houseNum: 258,
    }
})

// Tests
describe("Create request route", () => {
    it("Should create succesfully the request", async() => {
        const credentials = await request.post("/user/create").send(userData)
        const cookie = credentials.headers['set-cookie']
        requestData.id = credentials.body.id

        const res = await request.post("/request/create").set("Cookie", cookie).send(requestData)
        expect(res.statusCode).toBe(200)
        expect(res.body.msg).toBe("Pedido feito com sucesso")
    })

    it("Should return a missing info message", async() => {
        const credentials = await request.post("/user/create").send(userData)
        const cookie = credentials.headers['set-cookie']
        requestData.id = credentials.body.id

        requestData.items = ""

        const res = await request.post("/request/create").set("Cookie", cookie).send(requestData)
        expect(res.statusCode).toBe(400)
        expect(res.body.msg).toBe("Informações insuficientes")
    })

    it("Should return a user doesn't exist message", async() => {
        const credentials = await request.post("/user/create").send(userData)
        const cookie = credentials.headers['set-cookie']
        requestData.id = credentials.body.id + 1

        const res = await request.post("/request/create").set("Cookie", cookie).send(requestData)
        expect(res.statusCode).toBe(400)
        expect(res.body.msg).toBe("Usuario inexistente")
    })
})