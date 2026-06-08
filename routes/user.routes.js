const express = require('express');
const router = express.Router();

const { createUsers ,showCreatePage } = require('../controller/user.controller');
router.get('/', showCreatePage);
router.post('/', createUsers);     


module.exports = router;