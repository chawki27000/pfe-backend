var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var toxidromeSchema = new Schema({
    name: String,
    sign: [{name: String}],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Toxidrome', toxidromeSchema);
