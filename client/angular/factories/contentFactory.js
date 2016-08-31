myAppModule.factory('contentFactory', function($http, $window, $state){
	var contentFactory = {}

	contentFactory.getAllContent = function(callback){
		$http.get('/content/getAllContent').success(function(res){
			callback(res);
		})
	};

	contentFactory.addNewContent = function(data){
		return $http.post('/content/addNewContent', data).success(function(res){
			alert(res.message)
			return res;
		})
	};

	contentFactory.findContentDetails = function(data, callback){
		console.log('FACTORY', data)
		$http.get('/content/findContentDetails/' + data).success(function(res){
			console.log(res)
			callback(res)
		})
	};

	contentFactory.editContent = function(data, callback){
		console.log('FACTORY', data)
		$http.post('/content/editContent', data).success(function(res){
			console.log(res)
			callback(res)
		})
	};

	contentFactory.deleteContent = function(data, callback){
		console.log('FACTORY', data)
		$http.post('/content/deleteContent', data).success(function(res){
			console.log(res)
			callback(res)
		})
	}

	return contentFactory;
});