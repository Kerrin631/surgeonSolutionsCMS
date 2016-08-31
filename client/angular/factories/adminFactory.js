myAppModule.factory('adminFactory', function($http, $window, $state){
	var adminFactory = {}
	// The factory is nothing more than a function that returns an object

	adminFactory.getAllUsers = function(callback){
		$http.get('/admin/getAllUsers').success(function(res){
			callback(res);
		})
	};

	adminFactory.authorizeUser = function(user_id, callback){
		console.log("FACTORY", user_id)
		$http.post('/admin/authorizeUser', user_id).success(function(data){
			console.log(data)
			callback(data)
		})
	};

	adminFactory.deleteUser = function(user_id, callback){
		console.log("FACTORY", user_id)
		$http.post('/admin/deleteUser', user_id).success(function(data){
			console.log(data)
			callback(data)
		})
	};

	adminFactory.makeAdmin = function(user_id, callback){
		console.log("FACTORY", user_id)
		$http.post('/admin/makeAdmin', user_id).success(function(data){
			console.log(data)
			callback(data)
		})
	};

	adminFactory.removeAdminAccess = function(user_id, callback){
		console.log("FACTORY", user_id)
		$http.post('/admin/removeAdminAccess', user_id).success(function(data){
			console.log(data)
			callback(data)
		})
	};	

	

	// adminFactory.findClientDetails = function(api, callback){
	// 	var id = api
	// 	$http.get('/client/getSingleClientInfo/' + id).success(function(res){
	// 		callback(res);
	// 	})
	// };

	// adminFactory.editClient = function(data, callback){
	// 	console.log('FACTORY', data)
	// 	$http.post('/client/update', data).success(function(res){
	// 		// console.log(res);
	// 		callback(res);
	// 	})
	// };

	// adminFactory.deleteClient = function(data, callback){
	// 	console.log('FACTORY', data)
	// 	$http.post('/client/delete', data).success(function(res){
	// 		// console.log(res);
	// 		callback(res);
	// 	})
	// };

	return adminFactory;
});