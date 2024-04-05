// Imports
const router = require("express").Router()
const requestController = require("../controllers/requestController")

// Routes
router.route("/request/create").post((req, res) => requestController.create(req, res))
router.route("/request/:id").get((req, res) => requestController.getById(req, res))
router.route("/request/update").post((req, res) => requestController.update(req, res))
router.route("/request/:id").delete((req, res) => requestController.delete(req, res))

module.exports = router