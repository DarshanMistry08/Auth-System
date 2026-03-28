const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/users.js');

function showCreatePage(req, res) {
    res.render('index');
};

async function createUsers(req, res) {
    try {
        let { username, email, age, password } = req.body;

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async (err, hash) => {
                let createduser = await User.create({
                    username, email, age, password: hash
                });
                let token = jwt.sign({ email }, process.env.JWT_SECRET);
                res.cookie('token', token);
                res.send(createduser);
            });
        });
    } catch (err) {
        console.log(err); 
        res.status(500).send("Error");
    };
};
module.exports = { createUsers, showCreatePage }