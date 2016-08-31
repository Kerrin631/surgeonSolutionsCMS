myAppModule.factory('clientFactory', function($http, $window, $state){
	var clientFactory = {}
	// var user = []
	// The factory is nothing more than a function that returns an object

	clientFactory.registerNewClient = function(user){
		return $http.post('/client/registerNewClient', user).success(function(data){
			alert(data.message)
			return data;
		})
	};

	clientFactory.getAllClients = function(callback){
		$http.get('/client/getAllClients').success(function(res){
			var allClients = res;
			callback(allClients);
		})
	};

	clientFactory.findClientDetails = function(api, callback){
		var id = api
		$http.get('/client/getSingleClientInfo/' + id).success(function(res){
			callback(res);
		})
	};

	clientFactory.addAddressToClient = function(data){
		console.log(data)
		$http.post('/location/addAddressToClient', data).success(function(res){
			console.log(res.message);
			return res
		})
	};

	clientFactory.findLocation = function(data, callback){
		console.log('FACTORY', data.id)
		$http.get('/location/findLocation/' + data.id).success(function(res){
			console.log(res)
			callback(res)
		})
	};

	clientFactory.editLocation = function(data){
		console.log('FACTORY', data)
		$http.post('/location/editLocation', data).success(function(res){
			console.log(res);
			return res;
		})
	};

	clientFactory.deleteClientLocation = function(data){
		console.log('FACTORY', data)
		$http.post('/location/deleteLocation', data).success(function(res){
			console.log(res);
			return res;
		})
	};

	clientFactory.editClient = function(data, callback){
		console.log('FACTORY', data)
		$http.post('/client/update', data).success(function(res){
			// console.log(res);
			callback(res);
		})
	};

	clientFactory.deleteClient = function(data, callback){
		console.log('FACTORY', data)
		$http.post('/client/delete', data).success(function(res){
			// console.log(res);
			callback(res);
		})
	};

	return clientFactory;
});