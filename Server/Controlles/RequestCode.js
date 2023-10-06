//Models
const Users = require('../Models/Users')
    //middleWare
const { SendEmail } = require('../MiddleWare/SendEmail')
const { OTPGenerator } = require('../MiddleWare/OtpGenerator')
const { createToken } = require('../MiddleWare/CreateToken')
const RequestCode = async(req, res, next) => {
    const decodedToken = req.decodedToken;
    const userId = decodedToken.id;
    const newOTP = OTPGenerator()
    try {
        find_user = await Users.findOne({ _id: `${userId}` })
        if (!find_user) {
            throw new Error('InvalidEmail')
        } else {
            const Email = find_user.Email
            const update_User_Otp = await Users.updateOne({ Email: `${Email}` }, { $set: { otp: newOTP } })
            if (!update_User_Otp) {
                throw new Error('codeSendigFaild')
            } else {
                const token = createToken(userId, find_user.role)
                SendEmail(req, res, next, newOTP.code, Email, token)
            }
        }
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}
module.exports = { RequestCode }