const express = require('express');
const router = express.Router();


const postAPI = require('../../../controllers/api/v1/posts_api')

router.get('/' , postAPI.index);

router.delete('/:id' ,postAPI.destroy );


module.exports = router;