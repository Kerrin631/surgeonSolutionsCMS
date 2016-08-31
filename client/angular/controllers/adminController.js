//  build the controllers
    // Create a controller (attached to this module), and inject the customerFactory in it.
    // Create a module
      // var myAppModule = angular.module('myApp', ['ngRoute']);
      // Create a controller (attached to this module), and inject the customerFactory in it.
myAppModule.controller('adminController', function ($scope, $state, userAuthFactory, $routeParams, adminFactory){
    $scope.allUsers = {}


    adminFactory.getAllUsers(function(data){
        $scope.allUsers = data;
        console.log($scope.allUsers)
    });

    $scope.authorizeUser = function(data){
        console.log(data)
        var id = {id: data}
        adminFactory.authorizeUser(id, function(res){
            adminFactory.getAllUsers(function(data){
                $scope.allUsers = data;
                console.log($scope.allUsers)
            });
        })
    }

    $scope.deleteUser = function(data){
        console.log(data)
        var id = {id: data}
        if (confirm("Are you sure you want to delete this user?")){
            adminFactory.deleteUser(id, function(res){
                adminFactory.getAllUsers(function(data){
                    $scope.allUsers = data;
                    console.log($scope.allUsers)
                });
            })
        }
    }

    $scope.makeAdmin = function(data){
        console.log(data)
        var id = {id: data}
        adminFactory.makeAdmin(id, function(res){
            console.log(res)
            adminFactory.getAllUsers(function(data){
                $scope.allUsers = data;
                console.log($scope.allUsers)
            });
        })
    }

    $scope.removeAdminAccess = function(data){
        console.log(data)
        var id = {id: data}
        adminFactory.removeAdminAccess(id, function(res){
            console.log(res)
            adminFactory.getAllUsers(function(data){
                $scope.allUsers = data;
                console.log($scope.allUsers)
            });
        })
    }
});




