var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var drugSchema = new Schema({
    category : String,
    name : String,
    format : String,
    masse : Number,

});

module.exports = mongoose.model('Drug', drugSchema);
