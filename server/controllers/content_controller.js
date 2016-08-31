var mongoose = require('mongoose');
var Client = require('./../models/client_model.js');
var Content = require('./../models/content_model.js');

module.exports = {

	addNewContent: function(req, res, next){
		console.log(req.body, 'CONTENT CONTROLLER')
		Client.findOne({apiKey: req.body.apiKey}, function(err, client){
			if(err){
				console.log('THERE WAS AN ERROR')
				return res.json({message: 'This content already exists.'})
			} else {
				var doctor = client.firstName + ' ' + client.lastName
				var content = new Content();
				content.apiKey = req.body.apiKey;
				content.title = req.body.title;
				content.information = req.body.information;
				content.doctor = doctor;
				console.log('ABOUT TO SAVE content')
				content.save(function (err){
					if(err){
						console.log(err, 'ERROR')
						return next(err);
					}
				})
			}
			res.json({message: 'Successfully added content'})
		})
	},

	getAll: function(req, res, next){
		Content.find({}, function(err, results){
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
		Content.find({_id: id}, function(err, contentInfo){
			if(err){
				console.log(err);
				return next(err)
			} else {
				console.log('DETAILS', contentInfo)
				res.json(contentInfo)
			}
		})
	},

	editContent: function(req, res, next){
		console.log('CONTROLLER', req.body)
		Content.findOne({_id: req.body._id}, function(err, content){
			content.title = (req.body.title);
			content.information = (req.body.information);
			content.save(function(err){
				if(err){
					return next(err);
				}
			})
			res.json({message: 'Content Updated'})
		})
	},

	deleteContent: function(req, res, next){
		console.log('CONTROLLER', req.body)
		var id = req.body.id
		Content.remove({_id: id}, function(err){
			if(err){
				console.log(err)
				return next(err);
			}
		});
		res.json({message:'Content Deleted'})
	},

}