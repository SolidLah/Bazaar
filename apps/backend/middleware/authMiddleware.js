const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header (Bearer ...)
      token = req.headers.authorization.split(" ")[1]

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // get object id of user from token payload
      req.user = await User.findById(decoded.payload).select("-password")

      next()
    } catch (error) {
      console.log(error)

      res.status(401)
      throw new Error("Not authorised")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Not authorised, no token")
  }
})

module.exports = {
  protect,
}
