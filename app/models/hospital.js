var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var hospitalSchema = new Schema({
    name : String,
    address : String,
    coordinates : {
        lat : Number,
        lon : Number
    }
});

module.exports = mongoose.model('Hospital', hospitalSchema);
