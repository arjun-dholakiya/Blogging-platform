const authControllers = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.post("/signup",authControllers.signup);
router.post("/login",authControllers.login);

module.exports = router;