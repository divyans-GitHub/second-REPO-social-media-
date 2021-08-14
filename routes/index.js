const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller.js');

router.get('/' , homeController.home);
router.use('/users' , require('./user'));
//for any further routes , we access from here by
// router.use('/router_name' , require('./router_file_name'));





console.log('router is loaded');

module.exports = router;

