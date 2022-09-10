const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) => {
    const { name, password, email, pic } = req.body

    if (!name || !password || !email) {
        res.status(400)
        throw new Error("Please Enter All The Feilds")
    }

    const existUser = await User.findOne({ email })

    if(existUser) {
        res.status(400)
        throw new Error("Email Already Exist")
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            pic: user.pic,
        })
    }
    else{
        res.status(400)
        throw new Error("Failed To Create A New User")
    }

})

module.exports = {
    registerUser,
}