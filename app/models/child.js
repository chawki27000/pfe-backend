var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var childSchema = new Schema({
    user: Schema.Types.ObjectId,
    age: {
        num: Number,
        types: String
    },
    weight: Number,
    gender: {
        type: String,
        enum: ['Mal', 'Female'],
        default: 'Mal'
    },
    school_mother: String,
    school_father: String,
    address_parent: String,
    state: {type: String, default: ''},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Child', childSchema);
