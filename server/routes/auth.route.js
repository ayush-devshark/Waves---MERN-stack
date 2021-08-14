const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/signin', authController.signIn);
router.get('/isauth', auth(), authController.isAuth);
router.get('/cat', auth('readAny', 'cat'), authController.cat);

module.exports = router;
