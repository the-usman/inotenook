var jwt = require('jsonwebtoken');
const JWT_SECRET = "HiThisW!ed!note"
const fetchUser = (req, res, next) => {
    const token = req.header('token-auth')
    if (!token) {
        return res.status(401).json({ error: "Please authicte with the valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
    } catch (error) {
        return res.status(401).json({ error: "Please authicte with the valid token" })
    }
    next();
}

module.exports = fetchUser