//Models
const Users = require('../Models/Users')
const EmailVerification = async(req, res, next) => {
    const { Code } = req.body
    const decodedToken = req.decodedToken;
    const userId = decodedToken.id;
   
    try {
        const getUser = await Users.findOne({ _id: `${userId}` }, { otp: 1 })
        if (!getUser) {
            throw new Error('Invalid email');
        } else {
            const currentTime = new Date().getTime();
            if (currentTime > getUser.otp.ValidUntil + 100) {
                throw new Error('code expired');
            } else {
                if (getUser.otp.attempts < 3) {
                    if (parseInt(Code) === getUser.otp.code) {
                        const verifiyUser = await Users.updateOne({ _id: `${userId}` }, { $set: { isVerified: true } })
                        if (!verifiyUser) {
                            throw new Error('verification failed')
                        } else {
                                const user = await Users.findOne({ _id: `${userId}` },{Password:0,otp:0,updatedAt:0,__v:0,createdAt:0,isVerified:0})
                                res.status(200).json({ user })
                        }
                    } else {
                        const result = await Users.updateOne({ _id: `${userId}` }, { $inc: { 'otp.attempts': 1 } });
                        if (result.modifiedCount === 0) {
                            throw new Error('Invalid Password');
                        } else {
                            throw new Error('Invalid Code');
                        }
                    }
                } else {
                    throw new Error('Maximum attemps reach please resend code');
                }
            }
        }
    } catch (err) {
        res.status(400).json({ err: err.message })
    }

}
module.exports = { EmailVerification }