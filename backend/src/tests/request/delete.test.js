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
describe("Delete request route", () => {
    it("Should delete succesfuly the request", async() => {
        const userCredentials = await request.post("/user/create").send(userData)
        const cookie = userCredentials.headers['set-cookie']
        requestData.id = userCredentials.body.id

        const reqCredentials = await request.post("/request/create").set("Cookie", cookie).send(requestData)
        const requestId = reqCredentials.body.id

        const res = await request.delete(`/request/delete/${requestId}`).set("Cookie", cookie)
        expect(res.statusCode).toBe(200)
        expect(res.body.msg).toBe("Pedido deletado com sucesso")
    })

    it("Should return a missing info message", async() => {
        const userCredentials = await request.post("/user/create").send(userData)
        const cookie = userCredentials.headers['set-cookie']
        requestData.id = userCredentials.body.id

        await request.post("/request/create").set("Cookie", cookie).send(requestData)

        const res = await request.delete("/request/delete/notAnId").set("Cookie", cookie)
        expect(res.statusCode).toBe(400)
        expect(res.body.msg).toBe("Informações insuficientes") 
    })
})