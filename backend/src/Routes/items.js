// Imports
const router = require("express").Router()
const itemController = require("../controllers/itemController")

// Routes
router.route("/item/create").post((req, res) => itemController.create(req, res))
router.route("/item/:id").get((req, res) => itemController.getById(req, res))
router.route("/item/update").post((req, res) => itemController.update(req, res))
router.route("/item/:id").delete((req, res) => itemController.delete(req, res))

module.exports = router