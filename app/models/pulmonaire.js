var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var pulmonaireSchema = new Schema({
    doctor: Schema.Types.ObjectId,
    child: Schema.Types.ObjectId,
    fr: Number,
    amplitude: String,
    spo2: Number,
    fio2: Number,
    rythme: String,
    cyanose: Boolean,
    sign_lutte: String,
    sueur: Boolean,
    auscul_pleuro: {
        bruit: String,
        toux: String
    },
    protocol: [{text: String}]
});

module.exports = mongoose.model('Pulmonaire', pulmonaireSchema);
