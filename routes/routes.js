const express = require("express");
const router = express.Router();

const { login, logout, refresh, resetPassword, changePassword } = require("../Model/User/controllers");
const { getFatturas, getFatturaDetails } = require("../Model/Fattura/controllers");
const auth = require('../middlewares/middlewares')

// user routes
router.post("/login", login);
router.post("/logout", auth, logout);
router.get("/refresh", auth, refresh);
router.patch("/reset", resetPassword)
router.post("/change-password/:link", changePassword)

// fattura routes
router.get("/", auth, getFatturas);
router.get("/:fatturaId", auth, getFatturaDetails)

module.exports = router;
