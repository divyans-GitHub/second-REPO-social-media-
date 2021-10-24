const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller.js');

router.get('/' , homeController.home);
router.use('/users' , require('./user'));
//for any further routes , we access from here by
// router.use('/router_name' , require('./router_file_name'));

router.use( '/post' , require('./posts') );
// sending to comments.js if url is comming like "/comment" as usual
router.use('/comment' , require('./comments') );

router.use('/api' , require('./api'));

router.use('/likes' , require('./likes'));

console.log('router is loaded');

module.exports = router;

