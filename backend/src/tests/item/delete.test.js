// Modules
const app = require("../../index")
const request = require("supertest")(app)
const prisma = require("../../db/client")

// Setup
let itemData = {}
let userData = {}

beforeEach(() => {
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
})

// Tests
describe("Delete item route", () => {
    it("Should delete a item", async() => {
        const userCredentials = await request.post("/user/create").send(userData)
        const cookie = userCredentials.headers['set-cookie']
        userData.id = userCredentials.body.id

        await prisma.$executeRaw`UPDATE \`User\` SET \`isAdmin\` = 1 WHERE \`id\` = ${userData.id}`

        const itemCredentials = await request.post("/item/create").set("Cookie", cookie).send(itemData)
        itemData.id = itemCredentials.body.id

        const res = await request.delete(`/item/${itemData.id}`).set("Cookie", cookie)
        expect(res.statusCode).toBe(200)
        expect(res.body.msg).toBe("item deletado com sucesso")
    })

    it("Should return a missing ID message", async() => {
        const userCredentials = await request.post("/user/create").send(userData)
        const cookie = userCredentials.headers['set-cookie']
        userData.id = userCredentials.body.id

        await prisma.$executeRaw`UPDATE \`User\` SET \`isAdmin\` = 1 WHERE \`id\` = ${userData.id}`

        await request.post("/item/create").set("Cookie", cookie).send(itemData)

        const res = await request.delete(`/item/notAnId`).set("Cookie", cookie)
        expect(res.statusCode).toBe(400)
        expect(res.body.msg).toBe("ID não especificado")
    })

    it("Should return a item doesn't exist message", async() => {
        const userCredentials = await request.post("/user/create").send(userData)
        const cookie = userCredentials.headers['set-cookie']
        userData.id = userCredentials.body.id

        await prisma.$executeRaw`UPDATE \`User\` SET \`isAdmin\` = 1 WHERE \`id\` = ${userData.id}`

        const itemCredentials = await request.post("/item/create").set("Cookie", cookie).send(itemData)
        itemData.id = itemCredentials.body.id

        const res = await request.delete(`/item/${itemData.id + 1}`).set("Cookie", cookie)
        expect(res.statusCode).toBe(400)
        expect(res.body.msg).toBe("Item inexistente")
    })
})