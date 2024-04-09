// Imports
const router = require("express").Router()
const requestController = require("../controllers/requestController")
const cookieAuth = require("../middlewares/cookieAuth")

// Routes
router.route("/request/create").post(cookieAuth, (req, res) => requestController.create(req, res))
router.route("/request/:id").get((req, res) => requestController.getById(req, res))
router.route("/request/update").post((req, res) => requestController.update(req, res))
router.route("/request/:id").delete((req, res) => requestController.delete(req, res))

module.exports = router