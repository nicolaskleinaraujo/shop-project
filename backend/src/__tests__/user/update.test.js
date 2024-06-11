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

    const userCredentials = await request.post("/user/create").send(userData)
    cookie = userCredentials.headers['set-cookie']
    userData.id = userCredentials.body.id

    userData.fullName = "Still a Test"
})

// Tests
describe("Update account route", () => {
    it("Should update the account infos", async() => {
        const res = await request.post("/user/update").set("Cookie", cookie).send(userData)
        expect(res.statusCode).toBe(200)
    })

    it("Should return a missing info message", async() => {
        userData.fullName = ""

        const res = await request.post("/user/update").set("Cookie", cookie).send(userData)
        expect(res.statusCode).toBe(400)
        expect(res.body.msg).toBe("Informações insuficientes")
    })


    it("Should return a email already cadastered message", async() => {
        const repeteadEmail = userData.email

        userData.email = `${Date.now()}@gmail.com`
        userData.number = parseInt(Date.now().toString().slice(-9))

        const newCredentials = await request.post("/user/create").send(userData)
        cookie = newCredentials.headers['set-cookie']
        userData.id = newCredentials.body.id
        userData.email = repeteadEmail

        const test = await request.post("/user/update").set("Cookie", cookie).send(userData)
        expect(test.statusCode).toBe(400)
        expect(test.body.msg).toBe("Email já cadastrado")
    })

    it("Should return a number already cadastered message", async() => {
        const repeteadNumber = userData.number

        userData.email = `${Date.now()}@gmail.com`
        userData.number = parseInt(Date.now().toString().slice(-9))

        const newCredentials = await request.post("/user/create").send(userData)
        cookie = newCredentials.headers['set-cookie']
        userData.id = newCredentials.body.id
        userData.number = repeteadNumber

        const test = await request.post("/user/update").set("Cookie", cookie).send(userData)
        expect(test.statusCode).toBe(400)
        expect(test.body.msg).toBe("Numero já cadastrado")
    })
})
