var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var caseSchema = new Schema({
    doctor: Schema.Types.ObjectId,
    child: Schema.Types.ObjectId,
    taken_hour: {
        hour: {
            type: Number,
            min: 0,
        },
        minute: {
            type: Number,
            min: 0,
            max: 59
        }
    },
    taken_place: String,
    alone: Boolean,
    drugs: [{id : Schema.Types.ObjectId, quantity: Number, dose: Number}],
    sign: [{types: String, gravity: Number}],
    toxidrome: String,
    diagnostic: String,
    expert: {
        approve: Boolean,
        proposition: String
    },
    createdAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Case', caseSchema);
