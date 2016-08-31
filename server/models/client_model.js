var mongoose = require('mongoose');
var doctors = mongoose.createConnection('mongodb://localhost/doctors');

var ClientSchema = mongoose.Schema({
	apiKey: {type: String, unique: true},
	practice: String,
	firstName: String,
	lastName: String,
	email: {type: String, lowercase: true, unique: true},
	phone: String,
});

var Client = doctors.model('Client', ClientSchema);
module.exports = Client;
