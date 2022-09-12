const express = require("express")
const chats = require("./data/data")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./config/db")
const colors = require("colors")
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const { notFound, errorHandler } = require("./middlewares/errorMiddleware")

// environment variable config
dotenv.config()

// database connect
connectDB()

// middleware
app.use(cors())

// to accept json data form frontend
app.use(express.json())

// PORT
const PORT = process.env.PORT || 5000

// root api
app.get("/", (req, res) => {
    res.send("Pine Server is running")
})

// user routes
app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)

// error handler
app.use(notFound)
app.use(errorHandler)

// listening the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.yellow.bold)
})