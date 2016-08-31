var mongoose = require('mongoose');
var doctors = mongoose.createConnection('mongodb://localhost/doctors');

var PatientSchema = mongoose.Schema({
	apiKey: String,
	doctor: String,
	firstName: String,
	lastName: String,
	email: {type: String, lowercase: true, unique: true},
	phone: {type: String, lowercase: true, unique: true},
	streetAddress: String,
	city: String,
	state: String,
	zip : String,
	country: String,
	procedure: [{
		procedureType: String,
		testimonial: String,
		beforeImg: String,
		afterImg : String
	}]
});

var Patient = doctors.model('Patient', PatientSchema);
module.exports = Patient;


