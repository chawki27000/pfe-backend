var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var caseSchema = new Schema({
    doctor: Schema.Types.ObjectId,
    child: Schema.Types.ObjectId,
    taken_hour: [{
        hour: {
            type: Number,
            min: 0,
            max: 23
        },
        minute: {
            type: Number,
            min: 0,
            max: 59
        }
    }],
    taken_place: String,
    alone: Boolean,
    drugs: [{_id : Schema.Types.ObjectId, quantity: Number}],
    sign: [{types: String, gravity: Number, comment: String}],
    state_child: String,
    glasgow_score: {
        type: Number,
        min: 3,
        max: 15
    },
    diagnostic: String,
    createdAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Case', caseSchema);
