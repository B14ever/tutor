const express = require('express')
const router = express.Router()
    //controlles
const { EmailVerification } = require('../Controlles/EmailVerification')
const { RequestCode } = require('../Controlles/RequestCode')
const { verifyToken } = require('../MiddleWare/JWT_Verification')
    //routes
router.post('/',verifyToken,EmailVerification)
router.post('/RequestCode', verifyToken, RequestCode)
module.exports = router