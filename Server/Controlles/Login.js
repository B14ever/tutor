//Models
const Users = require('../Models/Users')
//Midleware
const { CompaierPassword } = require('../MiddleWare/bycrpt')
const { createToken } = require('../MiddleWare/CreateToken')
const Login = async(req, res, next) => {
    const { Email, Password } = req.body
    try {
        const check_user = await Users.findOne({ Email: `${Email}` })
        if (!check_user) {
            const error = new Error('Invalid Email or Password');
            error.status = 409; // set the status code to 409 (Conflict)
            throw error;
        }
    
         else {
            const check_password = await CompaierPassword(Password, check_user.Password)
            if (check_password) {
                const id = check_user._id
                const userId = id.toString()
                const token = createToken(userId)
                if (check_user.isVerified === false ){
                    res.status(404).json({token})
                }
               else{
                res.cookie('token', token, { httpOnly: true });
                const user = await Users.findOne({ Email: `${Email}`},{Password:0,otp:0,updatedAt:0,__v:0,createdAt:0,isVerified:0})
                res.status(200).json({ token, user })
               }
            } else {
                const error = new Error('Invalid Email or Password');
                error.status = 409; // set the status code to 409 (Conflict)
                throw error;
            }
        }
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { Login }