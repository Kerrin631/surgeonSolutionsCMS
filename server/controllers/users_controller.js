// var crypto = require('crypto');
var mongoose = require('mongoose');
var User = require('./../models/user_model.js');
var passport = require('passport');
var jwt = require('express-jwt');
var secret = 'secret';
var auth = jwt({secret: secret, userProperty: 'payload'});
// function hashPW(pwd){
// 	return crypto.createHash('sha256').update(pwd).digest('base64').toString();
// }


module.exports = {
	Register: function(req, res, next){
		console.log(req.body, 'USERS CONTROLLER')
		if(!req.body.firstName || !req.body.password){
			return res.status(400).json({message: 'Please fill out all fields'});
		}
		User.findOne({email: req.body.email}, function(err, user){
			console.log('searching...')
			if(err){
				return res.json({error: 'This username already exists.'})
			} else {
				var user = new User();
				console.log(req.body.email)
				user.setPassword(req.body.password);
				user.type = (req.body.type)
				user.email = (req.body.email);
				user.lastName = req.body.lastName;
				user.firstName = req.body.firstName;
				user.save(function (err){
					if(err){ 
						return next(err);
					}
				// return res.json({token: user.generateJWT()})
				return res.json({message: 'Successfully Registered!'})
				})
			}
		})
	},

	logIn: function(req, res, next){
		console.log("LOGGING IN", req.body)
	    if(!req.body.username || !req.body.password){
	      return res.status(400).json({message: 'Please fill out all fields'});
	    }
		passport.authenticate('local', function(err, user, info){
			if(err){ 
				console.log("DANGER WILL ROBINSON")
				return next(err); 
			}
			if(user){
				console.log('USER HERE', user)
				return res.json({token: user.generateJWT(), user: user});
			} else {
				console.log("DANGER WILL ROBINSON12")
				return res.json({error: "Log In or Password are Incorrect. Please check credentials and try again."});
			}
		})(req, res, next);
	},


	userUpdate: function(req, res, next){
		console.log(req.body)
		User.findOne({username: req.body.username}, function(err, user){
			user.email = req.body.updatedEmail;
			user.username = req.body.updatedUsername
			user.save(function(err){
				if(err){
					return next(err);
				}
		 	})
		 	return res.json({token: user.generateJWT()})
		})
	},

	authorizeUser: function(req, res, next){
		console.log(req.body)
		User.findOne({_id: req.body.id}, function(err, user){
			user.isAuthorized = true
			user.save(function(err){
				if(err){
					return next(err);
				}
		 	})
		 	return res.json({message: 'User has been authorized'})
		})
	},

	makeAdmin: function(req, res, next){
		console.log(req.body)
		User.findOne({_id: req.body.id}, function(err, user){
			user.isAdmin = true
			user.save(function(err){
				if(err){
					return next(err);
				}
		 	})
		 	return res.json({message: 'User has been granted Admin Privileges'})
		})
	},

	removeAdminAccess: function(req, res, next){
		console.log(req.body)
		User.findOne({_id: req.body.id}, function(err, user){
			user.isAdmin = false
			user.save(function(err){
				if(err){
					return next(err);
				}
		 	})
		 	return res.json({message: 'User\'s Admin Privileges have been revoked'})
		})
	},

	deleteUser: function(req, res, next){
		console.log(req.body)
		User.remove({_id: req.body.id}, function(err, results){
			if(err){
				console.log('error')
				return next(err);
			}
			return res.json({message: 'User has been deleted'})
		})
	},

	getAll: function(req, res, next){
		User.find({}, function(err, users) {
			res.json(users)
		})
	}
}
