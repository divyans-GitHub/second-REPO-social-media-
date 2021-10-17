
const mongoose = require('mongoose');


const resetPassTokenSchema = new mongoose.Schema({
    accesstoken: {
        type: String,
        required: true,
        unique: true
    },
    isValid: {
        type: Boolean,
        required: true

    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const ResetPassToken = mongoose.model('ResetPassToken' , resetPassTokenSchema );
module.exports = ResetPassToken;
