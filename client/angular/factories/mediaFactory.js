myAppModule.factory('mediaFactory', function($http, $window, $state){
	var mediaFactory = {}
	var pics = []
	// The factory is nothing more than a function that returns an object

// Pics ----------------------------------------------->
	// mediaFactory.getPics = function(callback){
	// 	$http.get('/pics').success(function(res){
	// 		if(res.status == 'error'){
	// 			console.log('error in getting pics');
	// 		} else {
	// 			pics = res
	// 			callback(pics)
	// 		};
	// 	});
	// };

	mediaFactory.savePics = function(data, callback){
		console.log('FACTORY', data)
		$http.post('/media/savePics', data).success(function(res){
			if(res.status == 'error'){
				console.log('error in deleting pics');
			} else {
				callback(res)
			};
		})
	};

	// mediaFactory.deletePics = function(data, callback){
	// 	$http.post('/delPics', data).success(function(res){
	// 		if(res.status == 'error'){
	// 			console.log('error in deleting pics');
	// 		} else {
	// 			callback(res)
	// 		};
	// 	});
	// };

	mediaFactory.deleteMedia = function(data, callback){
		console.log("FACTORY", data)
		$http.post('/media/deleteMediaItem', data).success(function(res){
			if (res.status == 'error') {
				console.log('error in deleting media');
			} else {
				callback(res)
			};
		})
	};

// Videos --------------------------------------------->
	mediaFactory.saveVideos = function(data, callback){
		console.log('FACTORY', data)
		$http.post('/media/saveVideos', data).success(function(res){
			if(res.status == 'error'){
				console.log('error in saving pics');
			} else {
				callback(res)
			};
		})
	};


	return mediaFactory;
});