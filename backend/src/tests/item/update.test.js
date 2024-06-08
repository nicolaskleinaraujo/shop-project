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
describe("Update item route", () => {
    
})