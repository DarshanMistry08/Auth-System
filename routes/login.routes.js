const express = require('express');
const router = express.Router();
const { showLoginPage, LoginUser } = require('../controller/login.controller');

router.get('/login', showLoginPage);
router.post('/login', LoginUser);

module.exports = router;