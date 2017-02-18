var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var childSchema = new Schema({
    user: Schema.Types.ObjectId,
    age: [{
        num: Number,
        types: String
    }],
    weight: Number,
    school_mother: String,
    school_father: String,
    address_parent: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Case', childSchema);
