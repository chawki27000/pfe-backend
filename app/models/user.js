var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    role: {
        type: String,
        enum: ['Doctor', 'Patient', 'Admin'],
        default: 'Doctor'
    }

});
module.exports = mongoose.model('User', userSchema);
