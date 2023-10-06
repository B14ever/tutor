const express = require('express')
const router = express.Router()
    //Controless
const { Login } = require('../Controlles/Login')
const { ForgetPassword } = require('../Controlles/ForgetPassword')
const { EmailVerification } = require('../Controlles/EmailVerification')
const { RecoverPassword } = require('../Controlles/RecoverPassword')
    //middle ware
const { verifyToken } = require('../MiddleWare/JWT_Verification')
router.post('/', Login)
router.post('/forgotenPassword', ForgetPassword)
router.post('/forgotenPassword/EmailVerrification', EmailVerification)
router.post('/forgotenPassword/newPassword', verifyToken, RecoverPassword)
module.exports = router