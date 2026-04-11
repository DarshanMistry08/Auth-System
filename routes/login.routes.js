const express = require('express');
const router = express.Router();
const { showLoginPage, LoginUser } = require('../controller/login.controller');

router.get('/', showLoginPage);
router.post('/user', LoginUser);

module.exports = router;