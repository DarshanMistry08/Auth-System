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
const forgotPasswordRoutes = require('./routes/forgot-password.routes');
const contactUsRoutes = require('./routes/contactUs.routes');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(cookieparser());

const upload = require('./config/multer');
const uploadRoutes = require('./routes/upload.routes');

app.use('/file', uploadRoutes);

app.use('/login', LoginRoutes);    
app.use('/', userRoutes);
app.use('/contact', contactUsRoutes);

app.use('/forgot-password', forgotPasswordRoutes);
app.use('/', forgotPasswordRoutes);
app.use('/reset-password', forgotPasswordRoutes);  //new

app.get('/users',checkAuth, async (req, res) => {
    let users = await User.find({});
    res.send(users);
});

app.post('/logout', (req, res) => {   //CHANGR post to get
    res.cookie('token', "")
    res.redirect('/login');
});
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});