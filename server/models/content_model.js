var mongoose = require('mongoose');
var doctors = mongoose.createConnection('mongodb://localhost/doctors');

var ContentSchema = mongoose.Schema({
	apiKey: String,
	title: String,
	information: String,
	doctor: String
});

var Content = doctors.model('Content', ContentSchema);
module.exports = Content;


