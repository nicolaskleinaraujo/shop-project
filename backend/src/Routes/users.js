// Imports
const router = require("express").Router()
const userController = require("../controllers/userController")
const cookieAuth = require("../middlewares/cookieAuth")
const adminAuth = require("../middlewares/adminAuth")

// Routes
router.route("/user/create").post((req, res) => userController.create(req, res))
router.route("/user/tryauth").get((req, res) => userController.tryAuth(req, res))
router.route("/user/:id").get(cookieAuth, (req, res) => userController.getById(req, res))
router.route("/user/update").post(cookieAuth, (req, res) => userController.update(req, res))
router.route("/user/:id").delete(cookieAuth, (req, res) => userController.delete(req, res))
router.route("/user/login").post((req, res) => userController.login(req, res))
router.route("/user").get(adminAuth, (req, res) => userController.getUsers(req, res))

module.exports = router
