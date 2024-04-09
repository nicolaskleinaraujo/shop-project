// Imports
const router = require("express").Router()
const adminController = require("../controllers/adminController")
const adminAuth = require("../middlewares/adminAuth")

// Routes
router.route("/admin/requests").get(adminAuth, (req, res) => adminController.getRequests(req, res))

module.exports = router