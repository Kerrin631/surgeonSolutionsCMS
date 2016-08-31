var mongoose = require('mongoose');
var Client = require('./../models/client_model.js');
var Media = require('./../models/media_model.js');

module.exports = {

	savePics: function(req, res, next){
		console.log('MEDIA CONTROLLER', req.body)
		for (var i = 0; i < req.body.length; i++){
			var media = new Media();
			media.apiKey = (req.body[i].apiKey);
			media.type = "Image"
			media.mediaURL = (req.body[i].mediaURL);
			console.log('ABOUT TO SAVE MEDIA (IMAGE)')
			media.save(function (err){
				if(err){
					console.log(err, 'ERROR')
					return next(err);
				}
			})
		}
		res.json({message: 'Successfully added images'})
	},

	saveVideos: function(req, res, next){
		console.log('MEDIA CONTROLLER', req.body)
		for (var i = 0; i < req.body.length; i++){
			var media = new Media();
			media.apiKey = (req.body[i].apiKey);
			media.type = "Video"
			media.mediaURL = (req.body[i].mediaURL);
			console.log('ABOUT TO SAVE MEDIA (VIDEO)')
			media.save(function (err){
				if(err){
					console.log(err, 'ERROR')
					return next(err);
				}
			})
		}
		res.json({message: 'Successfully added videos'})
	},

	deleteMediaItem: function(req, res, next){
		console.log('MEDIA CONTROLLER', req.body)
		Media.remove({_id: req.body.id}, function(err){
			if(err){
				console.log(err)
				// return next(err);
			}
		});
	res.json('Patient Deleted')
	}

}