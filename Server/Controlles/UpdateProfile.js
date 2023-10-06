//Models
const Users = require('../Models/Users')
const UpdateProfile = async(req, res) => {
    const { FirstName, LastName,  Age, Gender, City, PhoneNumber, Email } = req.body
    try {
        const updateUser = await Users.updateOne({ Email: `${Email}` }, { $set: { FirstName, LastName,City, Age, Gender,PhoneNumber } })
        if (!updateUser) {
            const error = new Error('Update failde try again');
            error.status = 409; // set the status code to 409 (Conflict)
            throw error;
        } else {
            const user = await Users.findOne({ Email: `${Email}` })
            res.status(200).json({ user })
        }
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { UpdateProfile }