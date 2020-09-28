const mongoose = require('mongoose');
const { Schema } = mongoose;

const loginSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    }
}); 

const LogIn = mongoose.model('LogIn', loginSchema);

module.exports = LogIn;
