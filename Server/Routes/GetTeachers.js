const express = require('express')
const router = express.Router()
    //controlles
const { GetTeachers } = require('../Controlles/GetTeachers')
    //routes
router.post('/',  GetTeachers)
module.exports = router