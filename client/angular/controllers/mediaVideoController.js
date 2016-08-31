myAppModule.controller('mediaVideoController', function ($scope, $state, mediaFactory, $routeParams, FileUploader){
    $scope.clientInfo = {}
    $scope.mediaInfo = []
    $scope.videos = [];


    // mediaFactory.getvideos(function(data){
    //   $scope.videos = data;
    // });
    $scope.doctorCheck = function(){
        if (!$scope.clientInfo.apiKey){
            alert("Please select doctor before uploading")
        } else {
            for (var x = 0; x < uploader.queue.length; x ++){
                uploader.queue[x].upload()
            }
            // item.upload()
        }
    }

      // --------------------------File Upload---------------------------

  var uploader = $scope.uploader = new FileUploader({
            url: '/newMedia',
            removeAfterUpload: true,
        });

        // CALLBACKS
        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
          console.log($scope.clientInfo)
          console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
          item.formData = [{data: 'data'}]
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
          // console.log('FOR KERRIN', $scope.clientInfo)
            $scope.mediaInfo.push({apiKey: $scope.clientInfo.apiKey, mediaURL: "https://s3.amazonaws.com/kerrinsbucket/" + fileItem.file.name})
            // $scope.videos.Contents.push({Key:fileItem.file.name})
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
          console.log($scope.mediaInfo)
          mediaFactory.saveVideos($scope.mediaInfo, function(res){
            $scope.mediaInfo = []
            console.log(res)
          });
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);


});