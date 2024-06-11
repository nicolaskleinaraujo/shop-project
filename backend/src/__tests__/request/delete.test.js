// Modules
const app = require("../../app")
const request = require("supertest")(app)

// Setup
let requestData
let userData
let requestId
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
    const userCredentials = await request.post("/user/create").send(userData)
    cookie = userCredentials.headers['set-cookie']
    requestData.id = userCredentials.body.id

    // Creating request and assigning ID to the variable
    const requestCredentials = await request.post("/request/create").set("Cookie", cookie).send(requestData)
    requestId = requestCredentials.body.id
})

// Tests
describe("Delete request route", () => {
    it("Should delete succesfuly the request", async() => {
        const test = await request.delete(`/request/delete/${requestId}`).set("Cookie", cookie)
        expect(test.statusCode).toBe(200)
        expect(test.body.msg).toBe("Pedido deletado com sucesso")
    })

    it("Should return a missing info message", async() => {
        const test = await request.delete("/request/delete/notAnId").set("Cookie", cookie)
        expect(test.statusCode).toBe(400)
        expect(test.body.msg).toBe("Informações insuficientes") 
    })

    it("Should return a request doesn't exist message", async() => {
        requestId += 1

        const test = await request.delete(`/request/delete/${requestId}`).set("Cookie", cookie)
        expect(test.statusCode).toBe(400)
        expect(test.body.msg).toBe("Pedido inexistente")
    })
})