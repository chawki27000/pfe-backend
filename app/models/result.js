var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var resultSchema = new Schema({
    doctor: Schema.Types.ObjectId,
    child: Schema.Types.ObjectId,
    hemo_id: Schema.Types.ObjectId,
    pleuro_id: Schema.Types.ObjectId,
    neuro_id: Schema.Types.ObjectId,
    hemo: {
        fc: String,
        ta: String,
        temp: String
    },
    pleuro: {
        fr: String,
        resp: String,
        ampl: String
    },
    feedback: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);
