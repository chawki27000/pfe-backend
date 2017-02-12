var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var protocoleSchema = new Schema({
    case : Schema.Types.ObjectId,
    text : String
});
