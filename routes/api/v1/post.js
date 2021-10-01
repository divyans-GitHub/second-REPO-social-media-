const express = require('express');
const router = express.Router();

const passport = require('passport');

const postAPI = require('../../../controllers/api/v1/posts_api')

router.get('/' , postAPI.index);

router.delete('/:id',passport.authenticate('jwt' , {session: false}) ,postAPI.destroy );


module.exports = router;