const asyncHandler = require('express-async-handler')
const generateToken = require('../config/generateToken')
const User = require('../models/userModel')

// User Register Controller
const registerUser = asyncHandler(async (req, res) => {
    const { name, password, email, pic } = req.body

    if (!name || !password || !email) {
        res.status(400)
        throw new Error("Please Enter All The Feilds")
    }

    const existUser = await User.findOne({ email })

    if (existUser) {
        res.status(400)
        throw new Error("Email Already Exist")
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error("Failed To Create A New User")
    }

})

// User login controller
const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid Email Or Password")
    }

})

// Searching user by query
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                {
                    name: { $regex: req.query.search, $options: 'i' },
                },
                {
                    email: { $regex: req.query.search, $options: 'i' },
                }
            ]
        }
        :
        {}

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })

    res.send(users)
})

module.exports = {
    registerUser,
    authUser,
    allUsers,
}