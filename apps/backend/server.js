require("dotenv").config()
const PORT = process.env.PORT

const express = require("express")
const app = express()

app.listen(PORT, () => console.log(`listening on port: ${PORT}`))

// before middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

module.exports = app // for testing
