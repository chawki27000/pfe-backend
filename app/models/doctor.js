var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var doctorSchema = new Schema({
    user : Schema.Types.ObjectId,
    speciality : String,
    service : String,
    work: Schema.Types.ObjectId
});
