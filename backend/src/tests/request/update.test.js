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
    it("Should update succesfuly the request", async() => {
        const userCredentials = await request.post("/user/create").send(userData)
        const cookie = userCredentials.headers['set-cookie']
        requestData.id = userCredentials.body.id

        const reqCredentials = await request.post("/request/create").set("Cookie", cookie).send(requestData)
        requestData.id = reqCredentials.body.id
        requestData.items = "Updated Request"

        const res = await request.post("/request/update").set("Cookie", cookie).send(requestData)
        expect(res.statusCode).toBe(200)
        expect(res.body.msg).toBe("Pedido atualizado com sucesso")
    })

    it("Should return a missing info message", async() => {
        const userCredentials = await request.post("/user/create").send(userData)
        const cookie = userCredentials.headers['set-cookie']
        requestData.id = userCredentials.body.id

        const reqCredentials = await request.post("/request/create").set("Cookie", cookie).send(requestData)
        requestData.id = reqCredentials.body.id
        requestData.items = ""

        const res = await request.post("/request/update").set("Cookie", cookie).send(requestData)
        expect(res.statusCode).toBe(400)
        expect(res.body.msg).toBe("Informações insuficientes")
    })

    it("Should return a request doesn't exist message", async() => {
        const userCredentials = await request.post("/user/create").send(userData)
        const cookie = userCredentials.headers['set-cookie']
        requestData.id = userCredentials.body.id

        const reqCredentials = await request.post("/request/create").set("Cookie", cookie).send(requestData)
        requestData.id = reqCredentials.body.id + 1
        requestData.items = "Updated Request"

        const res = await request.post("/request/update").set("Cookie", cookie).send(requestData)
        expect(res.statusCode).toBe(400)
        expect(res.body.msg).toBe("Pedido inexistente")
    })
})