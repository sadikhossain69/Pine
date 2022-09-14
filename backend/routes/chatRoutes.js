const express = require("express")
const { accessChat, fetchChats } = require("../controllers/chatControllers")
const { protect } = require("../middlewares/authMiddleware")

const router = express.Router()

router.route('/').post(protect, accessChat)
router.route('/').get(protect, fetchChats)
// router.route('/group').post(protect, createGroupChat)
// router.route('/rename').put(protect, remaneGroup)
// router.route('/groupremove').put(protect, removeFromGroup)
// router.route('/groupadd').put(protect, addToGroup)

module.exports = router