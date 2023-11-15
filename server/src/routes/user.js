const { getUserProfile, getUserProfileById, postMessage } = require("../controllers/user")
const { Router } = require("express")
const isAuth = require("../middlewares/isAuth")
const router=Router()

router.get("/",isAuth,getUserProfile)

router.get("/byId",getUserProfileById)

router.post("/message",isAuth,postMessage)

module.exports = router