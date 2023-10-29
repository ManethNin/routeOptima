const express = require('express');
const userController = require('../controllers/user.controller');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/sign-up', userController.signUp);
router.post('/login', userController.login);



router.post('/get-users', userController.getUsers);
router.patch('/users-pending', userController.acceptUsers);
router.delete('/users', userController.deleteUsers);


module.exports = router;