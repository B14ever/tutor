const jwt = require('jsonwebtoken');
require('dotenv').config()
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(400).json({ err: err});
            }

            req.decodedToken = decodedToken;
            next();
        });
    } else {
        res.status(400).json({ err: "out time" });
    }
}
module.exports = { verifyToken }