// Modules
const userController = require("../../controllers/userController")

// Setup
let req = {}
let res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    cookie: jest.fn(),
}

// Tests
describe("Update account route", () => {
    beforeEach(async() => {
        req = {
            body: {
                fullName: "Nicolas Klein Araujo",
                email: "nicolas@gmail.com",
                number: 123456789,
                password: "12345",
                city: "Maringá",
                street: "Av. Juscelino Kubitschek",
                houseNum: 258,
            }
        }
    
        res.status.mockClear()
        res.json.mockClear()
        res.cookie.mockClear()
    })

    it("Should update the account infos", async() => {
        const userCredentials = await request.post("/user/create").send(updatePayload)
        updatePayload.id = userCredentials.body.id
        
        const res = await request.post("/user/update").send(updatePayload).set("Cookie", userCredentials.headers['set-cookie'])
        expect(res.statusCode).toBe(200)

        delete updatePayload.id
    })

    it("Should return a missing info message", async() => {
        const userCredentials = await request.post("/user/create").send(updatePayload)
        updatePayload.id = userCredentials.body.id

        const res = await request.post("/user/update").send(updatePayload.fullName).set("Cookie", userCredentials.headers['set-cookie'])
        expect(res.body.msg).toBe("Informações insuficientes")
        expect(res.statusCode).toBe(400)

        delete updatePayload.id
    })


    it("Should return a email already cadastered message", async() => {
        await request.post("/user/create").send(payload)

        const userCredentials = await request.post("/user/create").send(updatePayload)
        updatePayload.id = userCredentials.body.id
        updatePayload.email = payload.email

        const res = await request.post("/user/update").send(updatePayload).set("Cookie", userCredentials.headers['set-cookie'])
        expect(res.body.msg).toBe("Email já cadastrado")
        expect(res.statusCode).toBe(400)

        delete updatePayload.id
        updatePayload.email = "test@gmail.com"
    })

    it("Should return a number already cadastered message", async() => {
        await request.post("/user/create").send(payload)

        const userCredentials = await request.post("/user/create").send(updatePayload)
        updatePayload.id = userCredentials.body.id
        updatePayload.number = payload.number

        const res = await request.post("/user/update").send(updatePayload).set("Cookie", userCredentials.headers['set-cookie'])
        expect(res.body.msg).toBe("Numero já cadastrado")
        expect(res.statusCode).toBe(400)

        delete updatePayload.id
        updatePayload.number = 123
    })
})
