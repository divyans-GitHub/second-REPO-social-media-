const express = require('express');
const router = express.Router();

// importing passport here
//const passport = require('passport');

const userController = require('../controllers/users_controller');
router.get('/profile' , userController.profile);

const postController = require('../controllers/post_controller');
const passport = require('passport');
router.get('/post' , postController.post);


router.get('/sign-in' , userController.signIn);

router.get('/sign-up' , userController.signUp);

router.post('/create' , userController.create);


router.post('/create-session' , passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
) , userController.createSession);


module.exports = router;
