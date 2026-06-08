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
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});  //This ensures: Even if user goes back, request hits server → server says ❌ not allowed → redirect to login.

app.use('/file', checkAuth, uploadRoutes);

app.use('/login', LoginRoutes);    
app.use('/', userRoutes);
app.use('/contact', contactUsRoutes);

app.use('/forgot-password', forgotPasswordRoutes);
app.use('/reset-password', forgotPasswordRoutes);  //new
app.use('/', forgotPasswordRoutes);

app.get('/users',checkAuth, async (req, res) => {
    let users = await User.find({});
    res.send(users);
});

app.post('/logout/user', (req, res) => {   //CHANGR post to get
    res.cookie('token', "")
    res.redirect('/login');
    res.send("logout hit")
});
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});