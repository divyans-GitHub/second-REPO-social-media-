const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');
router.get('/profile' , userController.profile);

const postController = require('../controllers/post_controller');
router.get('/post' , postController.post);

const signInController = require('../controllers/sign_in_controller');
router.get('/sign-in' , signInController.signIn);

const signUpController = require('../controllers/sign_in_controller');
router.get('/sign-up' , signUpController.signUp);

module.exports = router;
