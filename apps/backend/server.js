require("dotenv").config()
const PORT = process.env.PORT
const express = require("express")
const app = express()
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")

app.listen(PORT, () => console.log(`listening on port: ${PORT}`))
connectDB()

// before middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use("/users", require("./routes/userRoutes"))

// after middleware
app.use(errorHandler)

module.exports = app // for testing
