//Models
const Users = require('../Models/Users')
    //middleWare
const { SendEmail } = require('../MiddleWare/SendEmail')
const { OTPGenerator } = require('../MiddleWare/OtpGenerator')
const { HashPasword } = require('../MiddleWare/bycrpt')
const { createToken } = require('../MiddleWare/CreateToken')
const SignUP = async(req, res, next) => {
    const { FirstName, LastName,Age, Gender, City, Email, PhoneNumber, Password,Educational_Level,School,FieldOfStudy,Language } = req.body
    const OTP = OTPGenerator()
    const password = await HashPasword(Password)
    const newAccount = { FirstName:FirstName, LastName:LastName, Age:Age, Gender:Gender, City:City, Email:Email, PhoneNumber:PhoneNumber,Password:password,Educational_Level:Educational_Level,School:School,FieldOfStudy:FieldOfStudy,Language:Language,otp: OTP}
    try {
        const user = await Users.findOne({ Email: `${Email}` });
        if (user) {
            const error = new Error('User already exists');
            error.status = 409; // set the status code to 409 (Conflict)
            throw error;
        } else {
            const newUser = await Users.create(newAccount)
            if (!newUser) {
                const error = new Error('User Not Created try again');
                error.status = 403; // set the status code to 409 (Conflict)
                throw error;
            } else {
                const id = newUser._id
                const ID = id.toString()
                const token = createToken(ID)
                SendEmail(req, res, next, OTP.code, Email, token)
            }
        }
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }

}

module.exports = { SignUP }