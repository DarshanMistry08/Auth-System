const express = require('express');
const app = express();
const path = require('path');
const cookieparser = require('cookie-parser');
require('dotenv').config();
const User = require('./model/users');
const {checkAuth} = require('./middleware/auth.middleware');
const connectDB = require('./config/db');
connectDB();
const userRoutes = require('./routes/user.routes');
const LoginRoutes = require('./routes/login.routes');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(cookieparser());

const upload = require('./config/multer');
const uploadRoutes = require('./routes/upload.routes');

app.use('/file', uploadRoutes);

app.use('/user', LoginRoutes);
app.use('/', userRoutes);


app.get('/users', async (req, res) => {
    let users = await User.find({});
    res.send(users);
});

app.get('/logout', (req, res) => {
    res.cookie('token', "")
    res.redirect('/');
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});