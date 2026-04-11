const express = require('express');
const router = express.Router();

const { createUsers ,showCreatePage } = require('../controller/user.controller');
router.get('/create', showCreatePage);
router.post('/create', createUsers);     //rempove create from both


module.exports = router;