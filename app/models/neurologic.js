var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var neurologicSchema = new Schema({
    doctor: Schema.Types.ObjectId,
    child: Schema.Types.ObjectId,
    param1: {type: Number, min: 1, max:4},
    param2: {type: Number, min: 1, max:5},
    param3: {type: Number, min: 1, max:6},
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Neurologic', neurologicSchema);
