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
    const userCredentials = await request.post("/user/create").send(userData)
    cookie = userCredentials.headers['set-cookie']
    userData.id = userCredentials.body.id

    // Giving admin to the user
    await prisma.$executeRaw`UPDATE \`User\` SET \`isAdmin\` = 1 WHERE \`id\` = ${userData.id}`

    // Creating new item and assigning ID to the item payload
    const itemCredentials = await request.post("/item/create").set("Cookie", cookie).send(itemData)
    itemData.id = itemCredentials.body.id
})

// Tests
describe("Delete item route", () => {
    it("Should delete a item", async() => {
        const test = await request.delete(`/item/${itemData.id}`).set("Cookie", cookie)
        expect(test.statusCode).toBe(200)
        expect(test.body.msg).toBe("item deletado com sucesso")
    })

    it("Should return a missing ID message", async() => {
        const test = await request.delete(`/item/notAnId`).set("Cookie", cookie)
        expect(test.statusCode).toBe(400)
        expect(test.body.msg).toBe("ID não especificado")
    })

    it("Should return a item doesn't exist message", async() => {
        const test = await request.delete(`/item/${itemData.id + 1}`).set("Cookie", cookie)
        expect(test.statusCode).toBe(400)
        expect(test.body.msg).toBe("Item inexistente")
    })
})