var mongoose = require('mongoose');
var doctors = mongoose.createConnection('mongodb://localhost/doctors');

var LocationSchema = mongoose.Schema({
	apiKey: String,
	name: String,
	phone: String,
	streetAddress: String,
	city: String,
	state: String,
	zip : String,
	country: String
});

var Location = doctors.model('Location', LocationSchema);
module.exports = Location;