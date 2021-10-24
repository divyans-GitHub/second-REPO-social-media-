
const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');
// importing passport here
const passport = require('passport');


//making profile page accessible only to signed in user
router.get('/profile/:id' , passport.checkAuthentication , userController.profile);

//router for updating user's information
router.post('/update/:id' , passport.checkAuthentication , userController.update );




router.get('/sign-in' , userController.signIn);

router.get('/sign-up' , userController.signUp);

router.post('/create' , userController.create);


router.post('/create-session' , passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
) , userController.createSession);


router.get('/sign-out' , userController.destroySession);


//route to send request to google
router.get('/auth/google' , passport.authenticate('google',{scope: ['profile' , 'email']}) );
// router for callbackURL
router.get(
    '/auth/google/callback',
    passport.authenticate(
        'google',
        {failureRedirect: 'users/sign-in'}
    ),
    userController.createSession
);


router.post('/reset' , userController.resetPassword );
router.get('/reset_password/' , userController.createNewPass )
router.post('/reset_password/' , userController.addNewPass );


router.use('/add-friend' , require('./friendship') );






module.exports = router;
