var mongoose = require('mongoose');
var users = require('./../controllers/users_controller.js');
var clients = require('./../controllers/clients_controller.js');
var patients = require('./../controllers/patients_controller.js');
var content = require('./../controllers/content_controller.js');
var media = require('./../controllers/media_controller.js');
var crypto = require('crypto');
var express = require('express');
var jwt = require('express-jwt');
var s3 = require('s3');
var secret = 'secret';
var auth = jwt({secret: secret, userProperty: 'payload'});
var fs = require('fs');

module.exports = function(app, client) {
  // verb: get, plural of target as the URI is the RESTful index method (it returns all customers)

  // User Routes ---------------------------------->
	app.post('/register', function(req, res, next){
		console.log('ROUTES', req.body)
		users.Register(req, res, next)
	});

	app.post('/login', function(req, res, next){
		console.log('ROUTES', req.body)
		users.logIn(req, res, next)
	});

	app.post('/user/update', function(req, res, next){
		console.log('ROUTES', req.body)
		users.userUpdate(req, res, next)
	});

	app.post('/user/delete', function(req, res, next){
		console.log('ROUTES', req.body)
		users.deleteUser(req, res, next)
	});
	// End User Routes ---------------------------->

	// Client Routes ------------------------------>
	app.post('/client/registerNewClient', function(req, res, next){
		console.log('ROUTES', req.body)
		clients.add(req, res, next)
	})

	app.get('/client/getAllClients', function(req, res){
		clients.getAll(req, res)
	})

	app.get('/client/getSingleClientInfo/:id', function(req, res){
		console.log('ROUTES', req.params.id)
		clients.getOne(req, res)
	})

	app.post('/location/addAddressToClient', function(req, res, next){
		console.log('ROUTES', req.body)
		clients.addAddressToClient(req, res)
	})

	app.get('/location/findLocation/:id', function(req, res){
		console.log('ROUTESsss', req.params.id)
		clients.findLocation(req, res)
	})

	app.post('/location/editLocation', function(req, res, next){
		console.log('ROUTES', req.body)
		clients.editLocation(req, res)
	})

	app.post('/location/deleteLocation', function(req, res, next){
		console.log('ROUTES', req.body)
		clients.deleteLocation(req, res)
	})

	app.post('/client/delete', function(req, res, next){
		console.log('ROUTES', req.body)
		clients.deleteClient(req, res)
	})

	app.post('/client/update', function(req, res, next){
		console.log('ROUTES', req.body)
		clients.updateClient(req, res)
	})

	// End Client Routes -------------------------->

	// Patient Routes ----------------------------->
	app.post('/patient/registerNewPatient', function(req, res, next){
		console.log('ROUTES', req.body)
		patients.add(req, res, next)
	})

	app.get('/patient/getAllPatients', function(req, res){
		patients.getAll(req, res)
	})

	app.get('/patient/getSinglePatientInfo/:id', function(req, res){
		console.log('ROUTES', req.params.id)
		patients.getOne(req, res)
	})

	app.post('/patient/delete', function(req, res, next){
		console.log('ROUTES', req.body)
		patients.deletePatient(req, res)
	})

	app.post('/patient/update', function(req, res, next){
		console.log('ROUTES', req.body)
		patients.updatePatient(req, res)
	})

	// End Patient Routes -------------------------->

	// Patient Procedure Routes -------------------->
	app.post('/procedure/addProcedureToPatient', function(req, res, next){
		console.log('ROUTES', req.body)
		patients.addProcedureToPatient(req, res)
	})

	app.get('/procedure/findProcedure/:id', function(req, res){
		console.log('ROUTES', req.params.id)
		patients.findProcedure(req, res)
	})

	app.post('/procedure/editPatientProcedure', function(req, res, next){
		console.log('ROUTES', req.body)
		patients.editPatientProcedure(req, res)
	})

	app.post('/procedure/deletePatientProcedure', function(req, res, next){
		console.log('ROUTES', req.body)
		patients.deletePatientProcedure(req, res)
	})
	// End Patient Procedure Routes ---------------->

	// Content Routes ------------------------------>
	app.post('/content/addNewContent', function(req, res, next){
		console.log('ROUTES', req.body)
		content.addNewContent(req, res)
	})

	app.get('/content/getAllContent', function(req, res){
		content.getAll(req, res)
	})

	app.get('/content/findContentDetails/:id', function(req, res){
		console.log('ROUTES', req.params.id)
		content.getOne(req, res)
	})

	app.post('/content/editContent', function(req, res, next){
		console.log('ROUTES', req.body)
		content.editContent(req, res)
	})

	app.post('/content/deleteContent', function(req, res, next){
		console.log('ROUTES', req.body)
		content.deleteContent(req, res)
	})
	// End Content Routes -------------------------->

	// s3 Routes ----------------------------------->
	app.post('/newMedia', function(req, res){
		console.log("HERE", req.file);
		console.log('NOW IM HERE', req.file.originalname)
		var params = {
	      // localFile: "/location/toYour/uploads/"+req.file.filename,
			localFile: req.file.path,

			s3Params: {
				Bucket: "kerrinsbucket",
				Key: req.file.originalname,
			},
		};

		var uploader = client.uploadFile(params);

		uploader.on('error', function(err) {
			console.error("unable to upload:", err.stack);
		});
		uploader.on('progress', function() {
			console.log("progress", uploader.progressMd5Amount,
				uploader.progressAmount, uploader.progressTotal);
		});
		uploader.on('end', function() {
			console.log("done uploading");
			res.json({data: req.file.filename})
			fs.exists(req.file.path, function(exists){
				if(exists){
					console.log('File exists. Deleting now ...');
					fs.unlink(req.file.path);
				} else {
					console.log('No file to delete');
				}
			});
		});
	});

	// End s3 Routes ------------------------------->

	//  Media to DB Routes ------------------------->
	app.post('/media/savePics', function(req, res){
		console.log('ROUTES', req.body)
		media.savePics(req, res)
	})

	app.post('/media/saveVideos', function(req, res){
		console.log('ROUTES', req.body)
		media.saveVideos(req, res)
	})

	app.post('/media/deleteMediaItem', function(req, res){
		console.log('ROUTES', req.body)
		media.deleteMediaItem(req, res)
	})

	//  End Media to DB Routes --------------------->

	// Admin Routes -------------------------------->
	app.get('/admin/getAllUsers', function(req, res){
		users.getAll(req, res)
	})

	app.post('/admin/authorizeUser', function(req, res){
		console.log("ROUTES", req.body)
		users.authorizeUser(req, res)
	})

	app.post('/admin/deleteUser', function(req, res){
		console.log("ROUTES", req.body)
		users.deleteUser(req, res)
	})

	app.post('/admin/makeAdmin', function(req, res){
		console.log("ROUTES", req.body)
		users.makeAdmin(req, res)
	})

	app.post('/admin/removeAdminAccess', function(req, res){
		console.log("ROUTES", req.body)
		users.removeAdminAccess(req, res)
	})
	// End Admin Routes ---------------------------->
};



