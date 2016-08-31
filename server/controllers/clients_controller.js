var mongoose = require('mongoose');
var Client = require('./../models/client_model.js');
var Location = require('./../models/location_model.js');
var Patient = require('./../models/patient_model.js');
var Content = require('./../models/content_model.js');
var Media = require('./../models/media_model.js');

module.exports = {
	add: function(req, res, next){
		console.log(req.body, 'Client CONTROLLER')
		Client.findOne({practice: req.body.practice, email: req.body.email}, function(err, user){
			console.log('searching...')
			if(err){
				console.log('THERE WAS AN ERROR')
				return res.json({message: 'This client already exists.'})
			} else {
				console.log('I GOT HERE')
				var client = new Client();
				client.phone = (req.body.phone);
				client.email = (req.body.email);
				client.lastName = req.body.lastName;
				client.firstName = req.body.firstName;
				client.practice = (req.body.practice)
				client.apiKey = (req.body.apiKey)
				console.log('ABOUT TO SAVE CLIENT')
				client.save(function (err){
					if(err){ 
						console.log(err, 'is there an error HERE?')
						return next(err);
					}
				// return res.json({token: client.generateJWT()})
				})
				var location = new Location();
				location.phone = (req.body.phone);
				location.country = (req.body.country);
				location.zip = (req.body.zip);
				location.state = (req.body.state);
				location.city = (req.body.city);
				location.streetAddress = (req.body.streetAddress);
				location.name = (req.body.practice);
				location.apiKey = (req.body.apiKey);
				location.save(function (err){
					if(err){
						return next(err)
					}
				})
				res.json({message: 'Successfully added client'})
			}
		})
	},

	getOne: function(req, res, next){
		// console.log('CONTROLLER', req.params.id)
		var key = req.params.id;
		Client.find({apiKey: key}, function(err, clientInfo){
			if(err){
				console.log(err);
				return next(err)
			} else {
				Content.find({apiKey: key}, function(err, contentInfo){
					if(err){
						console.log(err);
						return next(err)
					} else {
						Location.find({apiKey: key}, function(err, locationInfo){
							if(err){
								console.log(err);
								return next(err)
							} else {
								Patient.find({apiKey: key}, function(err, patientInfo){
									if(err){
										console.log(err);
										return next(err)
									} else {
										Media.find({apiKey: key}, function(err, mediaInfo){
											if(err){
												console.log(err);
												return next(err)
											} else {
												var details = {client: clientInfo, location: locationInfo, content: contentInfo, patient: patientInfo, media: mediaInfo};
												// console.log('DETAILS', details)
												res.json(details)
											}
										})
									}
								})
							}
						})
					}
				})
			}
		})
	},

	getAll: function(req, res, next){
		Client.find({}, function(err, results){
			if (err){
				console.log(err)
				return next(err)
			} else {
				res.json(results)
			}
		})
	},

	addAddressToClient: function(req, res, next){
		console.log('CONTROLLER', req.body)
		var location = new Location();
		location.phone = (req.body.phone);
		location.country = (req.body.country);
		location.zip = (req.body.zip);
		location.state = (req.body.state);
		location.city = (req.body.city);
		location.streetAddress = (req.body.streetAddress);
		location.name = (req.body.name);
		location.apiKey = (req.body.apiKey);
		location.save(function (err){
			if(err){
				return next(err)
			}
		})
		res.json({message: 'Successfully added address'})
	},

	findLocation: function(req, res, next){
		Location.find({_id: req.params.id}, function(err, results){
			if (err){
				console.log(err)
				return next(err)
			} else {
				res.json(results)
			}
		})
	},

	editLocation: function(req, res, next){
		console.log('CONTROLLER', req.body)
		Location.findOne({_id: req.body._id}, function(err, location){
			location.phone = (req.body.phone);
			location.country = (req.body.country);
			location.zip = (req.body.zip);
			location.state = (req.body.state);
			location.city = (req.body.city);
			location.streetAddress = (req.body.streetAddress);
			location.name = (req.body.name);
			location.save(function(err){
				if(err){
					return next(err);
				} else {
					Location.find({apiKey: req.body.apiKey}, function(err, results){
						if(err){
							return next(err);
						} else {
							res.json(results)
						}
					})
				}
			})
		})
	},

	deleteLocation: function(req, res, next){
		console.log('CONTROLLER', req.body)
		Location.remove({_id: req.body.id}, function(err){
			if(err){
				return next(err);
			}
		})
	res.end()
	},

	updateClient: function(req, res, next){
		console.log('CONTROLLER', req.body)
		Client.findOne({_id: req.body._id}, function(err, client){
			client.phone = (req.body.phone);
			client.email = (req.body.email);
			client.lastName = (req.body.lastName);
			client.firstName = (req.body.firstName);
			client.practice = (req.body.practice);
			client.save(function(err){
				if(err){
					return next(err);
				}
			})
			res.end()
		})
	},

	deleteClient: function(req, res, next){
		console.log('CONTROLLER', req.body)
		Client.findOne({_id: req.body.id}, function(err, client){
			var apiKey = client.apiKey;
			console.log(apiKey)
			Location.remove({apiKey: apiKey}, function(err){
				if(err){
					console.log(err)
					// return next(err);
				}
			});
			Patient.remove({apiKey: apiKey}, function(err){
				if(err){
					console.log(err)
					// return next(err);
				}
			});
			Content.remove({apiKey: apiKey}, function(err){
				if(err){
					console.log(err)
					// return next(err);
				}
			});
			Media.remove({apiKey: apiKey}, function(err){
				if(err){
					console.log(err)
					// return next(err);
				}
			});
			Client.remove({apiKey: apiKey}, function(err){
				if(err){
					console.log(err)
					// return next(err);
				}
			});
		})
	res.json('Client Deleted')
	},
}


