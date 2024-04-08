// Imports
const router = require("express").Router()
const userController = require("../controllers/userController")

// Routes
router.route("/user/create").post((req, res) => userController.create(req, res))
router.route("/user/tryauth").get((req, res) => userController.tryAuth(req, res))
router.route("/user/:id").get((req, res) => userController.getById(req, res))
router.route("/user/update").post((req, res) => userController.update(req, res))
router.route("/user/:id").delete((req, res) => userController.delete(req, res))
router.route("/user/login").post((req, res) => userController.login(req, res))

module.exports = router
