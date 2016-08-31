myAppModule.controller('contentController', function ($scope, $state, contentFactory, $routeParams){
    $scope.newContent = {}
    $scope.allContent = []
     $scope.contentInfo = {}

    contentFactory.getAllContent(function(data){
        console.log(data)
        $scope.allContent = data;
    });

    $scope.addNewContent = function(){
        console.log($scope.newContent)
        contentFactory.addNewContent($scope.newContent).error(function(error){
            alert(error)
            $scope.error = error;
        }).then(function(){
            $scope.newContent = {}
            contentFactory.getAllContent(function(data){
                console.log(data)
                $scope.allContent = data;
            });
        })
    };

    $scope.findContentDetails = function(data){
        console.log(data);
        contentFactory.findContentDetails(data, function(res){
            console.log(res)
            $scope.contentInfo = res
        })
    };

    $scope.editContent = function(data){
        console.log(data)
        contentFactory.editContent(data, function(res){
            console.log(res)
            contentFactory.getAllContent(function(data){
                console.log(data)
                $scope.allContent = data;
            });
        })
    };

    $scope.deleteContent = function(data){
        console.log(data)
        var id = {id: data}
        contentFactory.deleteContent(id, function(res){
            console.log(res)
            contentFactory.getAllContent(function(data){
                console.log(data)
                $scope.allContent = data;
            });
        })
    }

    $scope.clearContent = function(){
        $scope.contentInfo = {}
    }

});