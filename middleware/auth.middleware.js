const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
    try {
        const token = req.cookies.token; // or Authorization header

        if (!token) {
            return res.redirect('/login'); // not logged in
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach user info to request
        req.user = decoded;

        next();
    } catch (err) {
        return res.redirect('/login'); 
    }
}

module.exports = {
    checkAuth,
};