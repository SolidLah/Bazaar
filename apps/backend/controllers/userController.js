const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const GenerateToken = (payload) => {
  return jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

// @desc Create new user
// @route POST /users/create
// @access public
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400)
    throw new Error("Add all required fields")
  }

  const userExists = await User.findOne({ username })

  if (userExists) {
    res.status(400)
    throw new Error("Username already exists")
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    username: username,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      token: GenerateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// @desc Authenticate user
// @route POST /users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      token: GenerateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid credentials")
  }
})

// @desc Get user data
// @route GET /users/me
// @access private
const getUserData = asyncHandler(async (req, res) => {
  const { _id, username } = await User.findById(req.user.id)

  res.status(200).json({
    _id: _id,
    username: username,
  })
})

module.exports = {
  createNewUser,
  loginUser,
  getUserData,
}
