const express = require('express')
const router = express.Router()
const authAdminController = require("../controllers/adminAuthController")

router.post("/login", authAdminController.login)

module.exports = router;