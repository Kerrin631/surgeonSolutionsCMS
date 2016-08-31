myAppModule.factory('patientFactory', function($http, $window, $state){
	var patientFactory = {}

	patientFactory.registerNewPatient = function(data){
		return $http.post('/patient/registerNewPatient', data).success(function(res){
			alert(res.message)
			return res;
		})
	};

	patientFactory.getAllPatients = function(callback){
		$http.get('/patient/getAllPatients').success(function(res){
			callback(res);
		})
	};

	patientFactory.findPatientDetails = function(id, callback){
		$http.get('/patient/getSinglePatientInfo/' + id).success(function(res){
			callback(res);
		})
	};

	patientFactory.editPatient = function(data, callback){
		console.log('FACTORY', data)
		$http.post('/patient/update', data).success(function(res){
			// console.log(res);
			callback(res);
		})
	};

	patientFactory.deletePatient = function(data, callback){
		console.log('FACTORY', data)
		$http.post('/patient/delete', data).success(function(res){
			// console.log(res);
			callback(res);
		})
	};

	patientFactory.addProcedureToPatient = function(data){
		console.log(data)
		$http.post('/procedure/addProcedureToPatient', data).success(function(res){
			console.log(res.message);
			return res
		})
	};

	patientFactory.findProcedure = function(data, callback){
		console.log('FACTORY', data)
		$http.get('/procedure/findProcedure/' + data.patientID + '%26' + data.id).success(function(res){
			console.log(res)
			callback(res)
		})
	};

	patientFactory.editPatientProcedure = function(data){
		console.log('FACTORY', data)
		$http.post('/procedure/editPatientProcedure', data).success(function(res){
			console.log(res)
			return res
		})
	};

	patientFactory.deletePatientProcedure = function(data){
		console.log('FACTORY', data)
		$http.post('/procedure/deletePatientProcedure', data).success(function(res){
			console.log(res)
			return res
		})
	};

	return patientFactory;
});