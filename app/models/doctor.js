var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var doctorSchema = new Schema({
    user : Schema.Types.ObjectId,
    speciality : String,
    service : String,
    work: Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Doctor', doctorSchema);
