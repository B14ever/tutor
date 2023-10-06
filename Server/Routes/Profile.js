const express = require('express')
const router = express.Router()
    //controlles
const { AddPhoto } = require('../Controlles/AddPhoto')
const { UpdateProfile } = require('../Controlles/UpdateProfile')
const { ChangePassword } = require('../Controlles/ChangePassword')
const { DeleteAccount } = require('../Controlles/DeleteAccoun')
    //middle ware
const { verifyToken } = require('../MiddleWare/JWT_Verification')
    //routes
router.post('/', UpdateProfile)
router.post('/ChangePassword', verifyToken, ChangePassword)
router.post('/deleteAccount', verifyToken, DeleteAccount)
router.post('/changePhoto', AddPhoto)

module.exports = router