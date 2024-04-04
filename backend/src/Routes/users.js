// Imports
const router = require("express").Router()
const userController = require("../controllers/userController")

// Routes
router.route("/user/create").post((req, res) => userController.create(req, res))
router.route("/user/:id").get((req, res) => userController.getById(req, res))

module.exports = router
