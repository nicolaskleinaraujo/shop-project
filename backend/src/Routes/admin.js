// Imports
const router = require("express").Router()
const adminController = require("../controllers/adminController")

// Routes
router.route("/admin/requests").get((req, res) => adminController.getRequests(req, res))

module.exports = router