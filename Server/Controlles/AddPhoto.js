//Models
const Users = require('../Models/Users')
const AddPhoto = async(req, res) => {
    const { profilePhoto } = req.body.data
    const Email = req.body.Email
    try {
        const addprofilePhoto = await Users.updateOne({ Email: Email }, { $set: { profilePhoto: profilePhoto } }).exec();
        if (!addprofilePhoto) {
            const error = new Error('PhotoUploadFailde');
            error.status = 403; // set the status code to 409 (Conflict)
            throw error;
        } else {
            const user = await Users.findOne({ Email: `${Email}` })
            return res.status(200).json({ user })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { AddPhoto }