// Modules
const app = require("../../app")
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
describe("Update item route", () => {
    it("Should update the item infos", async() => {
        const userCredentials = await request.post("/user/create").send(userData)
        const cookie = userCredentials.headers['set-cookie']
        userData.id = userCredentials.body.id

        await prisma.$executeRaw`UPDATE \`User\` SET \`isAdmin\` = 1 WHERE \`id\` = ${userData.id}`

        const itemCredentials = await request.post("/item/create").set("Cookie", cookie).send(itemData)
        itemData.id = itemCredentials.body.id

        const res = await request.post("/item/update").set("Cookie", cookie).send(itemData)
        expect(res.statusCode).toBe(200)
        expect(res.body.msg).toBe(`${itemData.name} atualizado com sucesso`)
    })

    it("Should return a missing info message", async() => {
        const userCredentials = await request.post("/user/create").send(userData)
        const cookie = userCredentials.headers['set-cookie']
        userData.id = userCredentials.body.id

        await prisma.$executeRaw`UPDATE \`User\` SET \`isAdmin\` = 1 WHERE \`id\` = ${userData.id}`

        const itemCredentials = await request.post("/item/create").set("Cookie", cookie).send(itemData)
        itemData.id = itemCredentials.body.id
        itemData.name = ""

        const res = await request.post("/item/update").set("Cookie", cookie).send(itemData)
        expect(res.statusCode).toBe(400)
        expect(res.body.msg).toBe("Informações insuficientes")
    })
})