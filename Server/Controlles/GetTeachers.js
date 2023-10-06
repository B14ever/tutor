//Models
const Users = require('../Models/Users')
const GetTeachers = async(req, res, next) => {
    try {
        const Teachers = await Users.find({}, {Password:0,otp:0,updatedAt:0,__v:0,createdAt:0,isVerified:0}).sort({ createdAt: -1 })
        if (!Teachers) {
            const error = new Error();
            error.status = 403;
            throw error;
        } else {
            return res.status(200).json({ Teachers })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { GetTeachers }