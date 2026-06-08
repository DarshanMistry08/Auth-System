const jwt = require("jsonwebtoken");
// app.use(require("cookie-parser")());

function checkAuth(req, res, next) {
    try {
        const token = req.cookies.token; // or Authorization header

        if (!token) {
            return res.redirect('/login'); // not logged in
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (err) {
        return res.redirect('/login'); 
    };
};

module.exports = { checkAuth };