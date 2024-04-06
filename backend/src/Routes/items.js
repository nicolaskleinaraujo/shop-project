// Imports
const router = require("express").Router()
const itemController = require("../controllers/itemController")

// Routes
router.route("/item/create").post((req, res) => itemController.create(req, res))

module.exports = router