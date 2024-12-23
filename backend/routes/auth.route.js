const express = require("express");
const { login, signup,getUserById,getAllUsers,deleteUserById } =require("../controllers/auth.controller.js");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/:id", getUserById);
router.get("/users/all", getAllUsers);
router.delete("/:id", deleteUserById);

module.exports = router;