// Modules
const app = require("../../app")
const request = require("supertest")(app)

// Setup
let requestData
let userData
let cookie

beforeEach(async() => {
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

    // Creating new user and assigning values to the payload
    const credentials = await request.post("/user/create").send(userData)
    cookie = credentials.headers['set-cookie']
    requestData.id = credentials.body.id
})

// Tests
describe("Create request route", () => {
    it("Should create succesfully the request", async() => {
        const test = await request.post("/request/create").set("Cookie", cookie).send(requestData)
        expect(test.statusCode).toBe(200)
        expect(test.body.msg).toBe("Pedido feito com sucesso")
    })

    it("Should return a missing info message", async() => {
        requestData.items = ""

        const test = await request.post("/request/create").set("Cookie", cookie).send(requestData)
        expect(test.statusCode).toBe(400)
        expect(test.body.msg).toBe("Informações insuficientes")
    })

    it("Should return a user doesn't exist message", async() => {
        requestData.id += 1

        const test = await request.post("/request/create").set("Cookie", cookie).send(requestData)
        expect(test.statusCode).toBe(400)
        expect(test.body.msg).toBe("Usuario inexistente")
    })
})