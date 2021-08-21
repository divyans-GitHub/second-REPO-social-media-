const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');
router.get('/profile' , userController.profile);

const postController = require('../controllers/post_controller');
router.get('/post' , postController.post);


router.get('/sign-in' , userController.signIn);

router.get('/sign-up' , userController.signUp);

// route for create new user
router.post('/create' , userController.create);
// route for user sign in
router.post('/create-session' , userController.createSession );


module.exports = router;
