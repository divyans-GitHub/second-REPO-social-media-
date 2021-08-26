
const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');
// importing passport here
const passport = require('passport');


//making profile page accessible only to signed in user
router.get('/profile' , passport.checkAuthentication , userController.profile);


const postController = require('../controllers/post_controller');
router.get('/post' , postController.post);


router.get('/sign-in' , userController.signIn);

router.get('/sign-up' , userController.signUp);

router.post('/create' , userController.create);


router.post('/create-session' , passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
) , userController.createSession);


router.get('/sign-out' , userController.destroySession);


module.exports = router;
