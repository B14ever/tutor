//Models
const Users = require('../Models/Users')
//MiddleWare
const { CompaierPassword } = require('../MiddleWare/bycrpt')
const DeleteAccount = async(req, res, next) => {
    const decodedToken = req.decodedToken
    const { id, role } = decodedToken
    const { Password } = req.body
    try {
        const check_user = await Users.findOne({ _id: `${id}` })
        const check_password = await CompaierPassword(Password, check_user.Password)
        if (check_password) {
                const DeleteAccount = await Users.deleteOne({ Email: `${check_user.Email}` })
                if (!DeleteAccount) {
                    const error = new Error('AccontDeltionFaile');
                    error.status = 403; // set the status code to 409 (Conflict)
                    throw error;
                } else {
                    res.status(200).json({ msg: 'AccountDeleted' })
                }
        } else {
            const error = new Error('IncorectOldPassword')
            error.status = 403
            throw error
        }
    } catch (err) {
        return res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { DeleteAccount }