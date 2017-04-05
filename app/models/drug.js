var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var drugSchema = new Schema({
    category : String,
    name : String,
    format : String,
    masse : Number,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Drug', drugSchema);
