const express = require("express")
const chats = require("./data/data")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./config/db")
const colors = require("colors")

// environment variable config
dotenv.config()

// database connect
connectDB()

// middleware
app.use(cors())
app.use(express.json())

// PORT
const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.send("Pine Server is running")
})

app.get('/api/chat', (req, res) => {
    res.send(chats)
})

app.get('/api/chat/:id', (req, res) => {
    const paramsId = req.params.id
    const singleChat = chats.find(c => c._id === paramsId)
    res.send(singleChat)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.yellow.bold)
})