// Modules
const app = require("../../app")
const request = require("supertest")(app)
const prisma = require("../../db/client")

// Setup
let itemData
let userData
let cookie

beforeEach(async() => {
    itemData = {
        name: "Cheesecake",
        description: "Cheesecake with red fruit syrup",
        value: 9.99,
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
    userData.id = credentials.body.id

    // Giving admin to the user
    await prisma.$executeRaw`UPDATE \`User\` SET \`isAdmin\` = 1 WHERE \`id\` = ${userData.id}`
})

// Tests
describe("Create item route", () => {
    it("Should create succesfully the item", async() => {
        const test = await request.post("/item/create").set("Cookie", cookie).send(itemData)
        expect(test.statusCode).toBe(200)
        expect(test.body.msg).toBe(`${itemData.name} criado com sucesso`)
    })

    it("Should return a missing info message", async() => {
        itemData.name = ""

        const test = await request.post("/item/create").set("Cookie", cookie).send(itemData)
        expect(test.statusCode).toBe(400)
        expect(test.body.msg).toBe("Informações insuficientes")
    })
})