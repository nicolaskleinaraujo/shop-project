// Modules
const app = require("../../index")
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
describe("Delete account route", () => {
    it("Should delete a account", async() => {
        const credentials = await request.post("/user/create").send(data)
        const cookie = credentials.headers['set-cookie']

        const res = await request.delete(`/user/${credentials.body.id}`).set("Cookie", cookie)
        expect(res.statusCode).toBe(200)
        expect(res.body.msg).toBe("Usuario deletado com sucesso")
    })

    it("Should return ID not specified message", async() => {
        const credentials = await request.post("/user/create").send(data)
        const cookie = credentials.headers['set-cookie']
        
        const res = await request.delete(`/user/notAnId`).set("Cookie", cookie)
        expect(res.statusCode).toBe(400)
        expect(res.body.msg).toBe("ID não especificado")
    })
})