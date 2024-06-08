// Modules
const app = require("../../index")
const request = require("supertest")(app)
const prisma = require("../../db/client")

// Setup
let itemData = {}
let userData = {}

beforeEach(() => {
    itemData = {
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
describe("Create request route", () => {
})