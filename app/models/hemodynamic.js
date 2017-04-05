var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var hemodynamicSchema = new Schema({
    doctor: Schema.Types.ObjectId,
    child: Schema.Types.ObjectId,
    pouls: Number,
    ta: Number,
    marbrure: Boolean,
    trc: Number,
    extr_temp: Boolean,
    temp: Number,
    turg_jugul: Boolean,
    hepat_jugul: Boolean,
    pres_vein: Number,
    diurese: String,
    auscu_card: String,
    protocol: [{text: String}],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Hemodynamic', hemodynamicSchema);
