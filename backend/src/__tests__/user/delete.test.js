// Modules
const app = require("../../app")
const request = require("supertest")(app)

// Setup
let userData
let cookie

beforeEach(async() => {
    userData = {
        fullName: "Nicolas Klein Araujo",
        email: `${Date.now()}@gmail.com`,
        number: parseInt(Date.now().toString().slice(-9)),
        password: "12345",
        city: "Maringá",
        street: "Av. Juscelino Kubitschek",
        houseNum: 258,
    }

    // Creating new user and assigning values to the payload
    const userCredentials = await request.post("/user/create").send(userData)
    userData.id = userCredentials.body.id
    cookie = userCredentials.headers['set-cookie']
})

// Tests
describe("Delete account route", () => {
    it("Should delete a account", async() => {
        const test = await request.delete(`/user/${userData.id}`).set("Cookie", cookie)
        expect(test.statusCode).toBe(200)
        expect(test.body.msg).toBe("Usuario deletado com sucesso")
    })

    it("Should return ID not specified message", async() => {
        const test = await request.delete(`/user/notAnId`).set("Cookie", cookie)
        expect(test.statusCode).toBe(400)
        expect(test.body.msg).toBe("ID não especificado")
    })

    it("Should return a user doesn't exist message", async() => {
        const test = await request.delete(`/user/${userData.id + 1}`).set("Cookie", cookie)
        expect(test.statusCode).toBe(400)
        expect(test.body.msg).toBe("Usuario inexistente")
    })
})