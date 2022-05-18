const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")
const {
  createNewUser,
  loginUser,
  getUserData,
} = require("../controllers/userController")

router.post("/create", createNewUser)
router.post("/login", loginUser)
router.get("/me", protect, getUserData)

module.exports = router
