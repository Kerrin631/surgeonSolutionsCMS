var mongoose = require('mongoose');
var Patient = require('./../models/patient_model.js');
var Client = require('./../models/client_model.js');

module.exports = {
	add: function(req, res, next){
		console.log(req.body, 'Patient CONTROLLER')
		Patient.findOne({email: req.body.email}, function(err, user){
			console.log('searching...')
			if(err){
				console.log('THERE WAS AN ERROR')
				return res.json({message: 'This patient already exists.'})
			} else {
				Client.findOne({apiKey: req.body.apiKey}, function(err, client){
					console.log('FOUND THE DOCTOR', client)
					var doctor = client.firstName + ' ' + client.lastName
				// console.log(doctor)
				// console.log('I GOT HERE')
				var patient = new Patient();
				patient.doctor = doctor
				patient.country = (req.body.country);
				patient.zip = (req.body.zip);
				patient.state = (req.body.state);
				patient.city = (req.body.city);
				patient.streetAddress = (req.body.streetAddress);
				patient.phone = (req.body.phone);
				patient.email = (req.body.email);
				patient.lastName = req.body.lastName;
				patient.firstName = req.body.firstName;
				patient.apiKey = (req.body.apiKey)
				console.log('ABOUT TO SAVE patient')
				patient.save(function (err){
					if(err){ 
						console.log(err, 'is there an error HERE?')
						return next(err);
					}
				})
				res.json({message: 'Successfully added patient'})
				})
			}
		})
	},

	getAll: function(req, res, next){
		Patient.find({}, function(err, results){
			if (err){
				console.log(err)
				return next(err)
			} else {
				res.json(results)
			}
		})
	},

	getOne: function(req, res, next){
		// console.log('CONTROLLER', req.params.id)
		var id = req.params.id;
		Patient.find({_id: id}, function(err, patientInfo){
			if(err){
				console.log(err);
				return next(err)
			} else {
				console.log('DETAILS', patientInfo)
				res.json(patientInfo)
			}
		})
	},

	updatePatient: function(req, res, next){
		console.log('CONTROLLER', req.body)
		Patient.findOne({_id: req.body._id}, function(err, patient){
			patient.phone = (req.body.phone);
			patient.email = (req.body.email);
			patient.lastName = (req.body.lastName);
			patient.firstName = (req.body.firstName);
			patient.country = (req.body.country);
			patient.zip = (req.body.zip);
			patient.state = (req.body.state);
			patient.city = (req.body.city);
			patient.streetAddress = (req.body.streetAddress);
			patient.save(function(err){
				if(err){
					return next(err);
				}
			})
			res.end()
		})
	},

	deletePatient: function(req, res, next){
		console.log('CONTROLLER', req.body)
		var id = req.body.id
		Patient.findOne({_id: id}, function(err, patient){
			var apiKey = patient.apiKey;
			console.log(apiKey)
			Patient.remove({_id: id}, function(err){
				if(err){
					console.log(err)
					// return next(err);
				}
			});
		})
	res.json('Patient Deleted')
	},

	addProcedureToPatient: function(req, res, next){
		console.log('PATIENT PROCEDURE CONTROLLER', req.body)
		Patient.update(
			{_id: req.body.patientID},
			{$push: {procedure: {$each: [{
			procedureType: req.body.type, 
			testimonial: req.body.testimonial, 
			beforeImg: req.body.beforeImg, 
			afterImg: req.body.afterImg
		}]}}}, function(err, result){
			if(err) {
				console.log(err, 'error');
			} else {
				console.log('RESULT', result)
				console.log('successfully added procedure')
			}
		})
		res.json({message: 'Successfully submitted New Procedure'})
	},

	findProcedure: function(req, res, next){
		var requestID = req.params.id
		var idArr = requestID.split('&')
		console.log('CONTROLLER', idArr)
		Patient.findOne({_id: idArr[0]}, function(err, patient){
			if (err){
				console.log(err)
				return next(err)
			} else {
				for (var i = 0 ; i < patient.procedure.length; i++){
					if (patient.procedure[i]._id == idArr[1]) {
						var procedureInfo = patient.procedure[i]
						res.json(procedureInfo)
					}
				}
			}
		})
	},

	editPatientProcedure: function(req, res, next){
		console.log('CONTROLLER', req.body)
		Patient.findOne({_id: req.body.patientID}, function(err, patient){
			if (err){
				console.log(err)
				return next(err)
			} else {
				console.log('PATIENT', patient)
				for (var i = 0; i < patient.procedure.length; i++) {
					if(patient.procedure[i]._id == req.body._id){
						console.log(patient.procedure[i], 'IM HERE NOW')
						patient.procedure[i].procedureType = req.body.procedureType,
						patient.procedure[i].testimonial = req.body.testimonial,
						patient.procedure[i].beforeImg = req.body.beforeImg,
						patient.procedure[i].afterImg = req.body.afterImg,
						console.log('ABOUT TO SAVE...')
						patient.save(function(err){
							if(err){
								console.log(err)
								return next(err)
							} else {
								console.log('SUCCESS')
								res.end()
							}
						})
					}
				}
			}
		})
	},

	deletePatientProcedure: function(req, res, next){
		console.log('CONTROLLER', req.body)
		Patient.findOne({_id: req.body.patient}, function(err, patient){
			if(err){
				console.log(err)
				return next(err)
			} else {
				for (var i = 0; i <patient.procedure.length; i++) {
					if(patient.procedure[i]._id == req.body.procedure){
						patient.procedure.splice(i, 1)
						patient.save(function(err){
							if(err){
								return next(err);
							} else {
								res.json({message: 'Item has been deleted'})
							}
						})
					}
				}
			}
		})
	},

}