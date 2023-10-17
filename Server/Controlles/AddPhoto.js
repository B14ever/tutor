//Models
const Users = require('../Models/Users')
require('dotenv').config()
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
const AddPhoto = async(req, res) => {
    const { profilePhoto } = req.body.data
    const Email = req.body.Email
    try {
       const uploadResult = await cloudinary.uploader.upload(profilePhoto, {
          upload_preset : 'unsigned_upload',
          allowed_formats : ['png','jpg','jpeg','svg','ico','jfif','webp']
       }, (error, result)=>{
            console.log(result, error);
          });
        const addprofilePhoto = await Users.updateOne({ Email: Email }, { $set: { profilePhoto: uploadResult.secure_url } }).exec();
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