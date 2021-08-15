const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const auth = require('../middleware/auth');

router
    .route('/profile')
    .get(auth('readOwn', 'profile'), usersController.profile)
    .patch(auth('updateOwn', 'profile'), usersController.updateProfile);

router
    .route('/email')
    .patch(auth('updateOwn', 'profile'), usersController.updateEmail);

module.exports = router;
