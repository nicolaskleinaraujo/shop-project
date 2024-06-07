// Modules
const app = require("../../index")
const request = require("supertest")(app)
const clearDatabase = require("../../db/clearDatabase")

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
})