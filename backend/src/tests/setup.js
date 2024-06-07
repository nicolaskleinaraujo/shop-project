// Modules
const clearDatabase = require("../db/clearDatabase")

// Setup
beforeEach(async() => {
    await clearDatabase()
})
