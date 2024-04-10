// Imports
const router = require("express").Router()
const itemController = require("../controllers/itemController")
const adminAuth = require("../middlewares/adminAuth")

// Routes
router.route("/item/create").post(adminAuth, (req, res) => itemController.create(req, res))
router.route("/item/:id").get(adminAuth, (req, res) => itemController.getById(req, res))
router.route("/item/update").post(adminAuth, (req, res) => itemController.update(req, res))
router.route("/item/:id").delete(adminAuth, (req, res) => itemController.delete(req, res))

module.exports = router