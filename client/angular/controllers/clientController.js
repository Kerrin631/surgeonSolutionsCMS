//  build the controllers
    // Create a controller (attached to this module), and inject the customerFactory in it.
    // Create a module
      // var myAppModule = angular.module('myApp', ['ngRoute']);
      // Create a controller (attached to this module), and inject the customerFactory in it.
myAppModule.controller('clientController', function ($scope, $state, clientFactory, $routeParams, $sce, mediaFactory){
    
    $scope.clientInfo = {};
    $scope.newClient = {};
    $scope.allClients = [];
    $scope.newAddress = {};
    $scope.address = {}

    // Handles untrusted video URLs
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }



    clientFactory.getAllClients(function(data){
        $scope.allClients = data;
    });

    $scope.registerNewClient = function() {
        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }
        var rString = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        if (!$scope.newClient.practice || !$scope.newClient.firstName || !$scope.newClient.lastName || !$scope.newClient.email || !$scope.newClient.phone){
            alert('Please fill out all fields')
        } else {
            $scope.newClient.apiKey = rString
            clientFactory.registerNewClient($scope.newClient).error(function(error){
                alert('Client already exists.')
                $scope.error = error;
            }).then(function(){
                $scope.newClient = {}
                clientFactory.getAllClients(function(data){
                    $scope.allClients = data;
                });
                $state.go('clients')
            });
        }
    };

    $scope.findClientDetails = function(data){
        // console.log(data);
        clientFactory.findClientDetails(data, function(res){
            console.log(res)
            $scope.clientInfo = res
        })
    };

    $scope.addAddressToClient = function(data){
        if (!$scope.newAddress.name || !$scope.newAddress.phone || !$scope.newAddress.streetAddress || !$scope.newAddress.city || !$scope.newAddress.state || !$scope.newAddress.zip || !$scope.newAddress.country){
            alert('Please fill out all fields')
        } else {
            // console.log(data)
            $scope.newAddress.apiKey = data
            console.log($scope.newAddress)
            clientFactory.addAddressToClient($scope.newAddress, function(res){
                console.log(res);
                $scope.newAddress = {}
            })
        }
    };

    $scope.clearNewAddress = function(){
        $scope.newAddress = {}
    };

    $scope.findLocation = function(data){
        console.log(data)
        $scope.address.id = data;
        clientFactory.findLocation($scope.address, function(res){
            console.log(res)
            $scope.address = res[0]
        })
    };

    $scope.editLocation = function(data){
        if (!$scope.address.name || !$scope.address.phone || !$scope.address.streetAddress || !$scope.address.city || !$scope.address.state || !$scope.address.zip || !$scope.address.country){
            alert('Please fill out all fields')
        } else {
            console.log(data)
            clientFactory.editLocation(data, function(res){
                console.log(res)
                $scope.clientInfo.location = res
            })
        }
    };

    $scope.deleteClientLocation = function(data){
        // console.log(data)
        var id = {id: data}
        clientFactory.deleteClientLocation(id, function(res){
            console.log(res)
        })
    };

    $scope.deleteClient = function(data){
        // console.log(data)
        var id = {id: data}
        clientFactory.deleteClient(id, function(res){
            console.log(res)
            clientFactory.getAllClients(function(data){
                $scope.allClients = data;
            });
        });
    };

    $scope.editClient = function(data){
        console.log(data)
        clientFactory.editClient(data, function(res){
            // console.log(res)
            clientFactory.getAllClients(function(data){
                $scope.allClients = data;
            });
        })
    };

    $scope.deleteMedia = function(data){
        // console.log(data)
        var id = {id: data.id}
        var apiKey = data.apiKey
        // console.log(id)
        // console.log(apiKey)
        mediaFactory.deleteMedia(id, function(res){
            // console.log(res)
            clientFactory.findClientDetails(apiKey, function(res){
                // console.log(res)
                $scope.clientInfo = res
            })
        })
    }

});
