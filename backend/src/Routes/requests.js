// Imports
const router = require("express").Router()
const requestController = require("../controllers/requestController")
const cookieAuth = require("../middlewares/cookieAuth")
const authorAuth = require("../middlewares/authorAuth")
const adminAuth = require("../middlewares/adminAuth")

// Routes
router.route("/request/create").post(cookieAuth, (req, res) => requestController.create(req, res))
router.route("/request/id/:id").get(cookieAuth, (req, res) => requestController.getById(req, res))
router.route("/request/update").post(authorAuth, (req, res) => requestController.update(req, res))
router.route("/request/delete/:id").delete(authorAuth, (req, res) => requestController.delete(req, res))
router.route("/request/user").get(cookieAuth, (req, res) => requestController.getByUser(req, res))
router.route("/request/slug/:slug").get(cookieAuth, (req, res) => requestController.getBySlug(req, res))
router.route("/request/:sort").get(adminAuth, (req, res) => requestController.getRequests(req, res))
router.route("/request/delivered/:id").post(adminAuth, (req, res) => requestController.setDelivered(req, res))

module.exports = router
