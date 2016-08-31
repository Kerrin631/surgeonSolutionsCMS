var mongoose = require('mongoose');
var doctors = mongoose.createConnection('mongodb://localhost/doctors');

var MediaSchema = mongoose.Schema({
	apiKey: { type: String, default: null },
	type: String,
	mediaURL: String
});

var Media = doctors.model('Media', MediaSchema);
module.exports = Media;


