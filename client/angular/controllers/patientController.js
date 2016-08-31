myAppModule.controller('patientController', function ($scope, $state, patientFactory, $routeParams, FileUploader){
	$scope.newPatient = {};
	$scope.allPatients = [];
	$scope.patientInfo = {};
	$scope.procedureInfo = {};
	$scope.procedure = {}

	patientFactory.getAllPatients(function(data){
		console.log(data)
        $scope.allPatients = data;
    });


	$scope.registerNewPatient = function(){
		console.log($scope.newPatient)
		if (!$scope.newPatient.apiKey || !$scope.newPatient.firstName || !$scope.newPatient.lastName || !$scope.newPatient.email || !$scope.newPatient.phone){
            alert('Mandatory fields: First and Last Name / Doctor Name / Contact Information')
        } else {
            patientFactory.registerNewPatient($scope.newPatient).error(function(error){
                alert('Client already exists.')
                $scope.error = error;
            }).then(function(){
                $scope.newPatient = {}
                patientFactory.getAllPatients(function(data){
                    $scope.allPatients = data;
                });
                $state.go('patients')
            });
        }
	}

	$scope.findPatientDetails = function(data){
        console.log(data);
        patientFactory.findPatientDetails(data, function(res){
            console.log(res)
            $scope.patientInfo = res
        })
    };

    $scope.editPatient = function(data){
        console.log(data)
        patientFactory.editPatient(data, function(res){
            // console.log(res)
            patientFactory.getAllPatients(function(data){
                $scope.allPatients = data;
            });
        })
    };

     $scope.deletePatient = function(data){
        var id = {id: data}
        patientFactory.deletePatient(id, function(res){
            console.log(res)
            patientFactory.getAllPatients(function(data){
                $scope.allPatients = data;
            });
        });
    };

    $scope.clearNewProcedure = function(){
        $scope.procedureInfo = {}
    };

$scope.addProcedureToPatient = function(data){
    console.log(data)
    $scope.procedureInfo.patientID = data
    console.log($scope.procedureInfo)
    if (!$scope.procedureInfo.type || !$scope.procedureInfo.testimonial){
        alert('Please fill out all fields. If field must be left empty please input \'N/A\' ')
    } else if ($scope.procedureInfo.type && $scope.procedureInfo.testimonial){
        if (!$scope.procedureInfo.beforeImg){
            if (!uploaderBefore.queue[0]){
                alert('Please make sure to either add image URL or choose image file for the Before Image')
            } else {
                console.log('Before image accounted for')
                if (!$scope.procedureInfo.afterImg) {
                   if (!uploaderAfter.queue[0]){
                        alert('Please make sure to either add image URL or choose image file for the After Image')
                    } else {
                        console.log('After image accounted for')
                        uploaderBefore.queue[0].upload()
                        uploaderAfter.queue[0].upload()
                        // patientFactory.addProcedureToPatient($scope.procedureInfo, function(res){
                        //     console.log(res);
                        //     $scope.procedureInfo = {}
                        // })
                    } 
                }
            }
        } else if (!$scope.procedureInfo.afterImg){
            if (!uploaderAfter.queue[0]){
                alert('Please make sure to either add image URL or choose image file for the After Image')
            } else {
                console.log('After image accounted for')
                uploaderBefore.queue[0].upload()
                uploaderAfter.queue[0].upload()
                // patientFactory.addProcedureToPatient($scope.procedureInfo, function(res){
                //     console.log(res);
                //     $scope.procedureInfo = {}
                // })
            }
        } else {
            patientFactory.addProcedureToPatient($scope.procedureInfo, function(res){
                console.log(res);
                $scope.procedureInfo = {}
            })
        }
    }
};

    $scope.findProcedure = function(data){
        console.log(data)
        $scope.procedure.patientID = data.patient;
        $scope.procedure.id = data.procedure;
        console.log($scope.procedure)
        patientFactory.findProcedure($scope.procedure, function(res){
            console.log(res)
            $scope.procedure = res
        })
    };

    $scope.editPatientProcedure = function(data){
    	console.log(data)
    	$scope.procedure.patientID = data.patient;
        $scope.procedure.id = data.procedure;
        console.log($scope.procedure)
    	patientFactory.editPatientProcedure($scope.procedure, function(res){
    		console.log(res)
    	})
    }

    $scope.deletePatientProcedure = function(data){
    	console.log(data)
    	patientFactory.deletePatientProcedure(data, function(res){
    		console.log(res)
    	})
    };

// --------------------------File Upload - Before---------------------------

  var uploaderBefore = $scope.uploaderBefore = new FileUploader({
            url: '/newMedia',
            removeAfterUpload: true,
        });

        // CALLBACKS
        uploaderBefore.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploaderBefore.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
            console.log(uploaderBefore)
        };
        uploaderBefore.onAfterAddingAll = function(addedFileItems) {
          // console.log($scope.clientInfo)
          console.info('onAfterAddingAll', addedFileItems);
        };
        uploaderBefore.onBeforeUploadItem = function(item) {
          item.formData = [{data: 'data'}]
            console.info('onBeforeUploadItem', item);
        };
        uploaderBefore.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploaderBefore.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploaderBefore.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploaderBefore.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploaderBefore.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploaderBefore.onCompleteItem = function(fileItem, response, status, headers) {
          console.log('FOR KERRIN', $scope.procedureInfo)
          $scope.procedureInfo.beforeImg = "https://s3.amazonaws.com/kerrinsbucket/" + fileItem.file.name
            // $scope.mediaInfo.push({apiKey: $scope.clientInfo.apiKey, mediaURL: "https://s3.amazonaws.com/kerrinsbucket/" + fileItem.file.name})
            // $scope.pics.Contents.push({Key:fileItem.file.name})
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploaderBefore.onCompleteAll = function() {
          console.log($scope.procedureInfo)
          // patientFactory.savePics($scope.procedureInfo, function(res){
          //   $scope.procedureInfo = []
          //   console.log(res)
          // });
            console.info('onCompleteAll');
        };

        console.info('uploaderBefore', uploaderBefore);

// --------------------------File Upload - After---------------------------

  var uploaderAfter = $scope.uploaderAfter = new FileUploader({
            url: '/newMedia',
            removeAfterUpload: true,
        });

        // CALLBACKS
        uploaderAfter.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploaderAfter.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
            console.log(uploaderAfter)
        };
        uploaderAfter.onAfterAddingAll = function(addedFileItems) {
          // console.log($scope.clientInfo)
          console.info('onAfterAddingAll', addedFileItems);
        };
        uploaderAfter.onBeforeUploadItem = function(item) {
          item.formData = [{data: 'data'}]
            console.info('onBeforeUploadItem', item);
        };
        uploaderAfter.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploaderAfter.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploaderAfter.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploaderAfter.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploaderAfter.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploaderAfter.onCompleteItem = function(fileItem, response, status, headers) {
          console.log('FOR KERRIN', $scope.procedureInfo)
          $scope.procedureInfo.afterImg = "https://s3.amazonaws.com/kerrinsbucket/" + fileItem.file.name
            // $scope.mediaInfo.push({apiKey: $scope.clientInfo.apiKey, mediaURL: "https://s3.amazonaws.com/kerrinsbucket/" + fileItem.file.name})
            // $scope.pics.Contents.push({Key:fileItem.file.name})
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploaderAfter.onCompleteAll = function() {
            console.log($scope.procedureInfo)
            patientFactory.addProcedureToPatient($scope.procedureInfo, function(res){
                console.log(res);
                $scope.procedureInfo = {}
            })
            console.info('onCompleteAll');
        };

        console.info('uploaderAfter', uploaderAfter);


});