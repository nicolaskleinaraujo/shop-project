// Modules
const clearDatabase = require("./src/db/clearDatabase")

// Setup
beforeEach(async() => {
    await clearDatabase()
})
