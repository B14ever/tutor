require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '100mb' }));

// use cors midlware to allow server request from other origin
app.use(
        cors({
            origin: ["http://localhost:5173", "https://cerulean-creponne-a924d4.netlify.app"],
            methods: ["GET", "POST"],
            credentials: true,
        })
    )
    //Backend Server
const Server = app.listen(process.env.PORT || 8000 ,console.log('connected to server'))
    //MiddleWres
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser());
    // Connect to MongoDB
mongoose.connect(process.env.MoGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => { Server })
.catch(err => console.error('Could not connect to MongoDB...', err))
//Routes
const AccountSignUp = require('./Routes/SignUP')
app.use('/AccountSignup',AccountSignUp)
const Verification = require('./Routes/EmailVerification')
app.use('/emailVerification', Verification)
const Login = require('./Routes/Login')
app.use('/Login', Login)
const  AccountProfiel = require('./Routes/Profile')
app.use('/AccountProfile', AccountProfiel)
const GetTeachers = require('./Routes/GetTeachers')
app.use('/teachers',GetTeachers)
