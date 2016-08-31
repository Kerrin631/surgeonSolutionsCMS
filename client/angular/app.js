var myAppModule = angular.module('surgeon_solutions_app', ['ngRoute', 'ui.router', 'angularFileUpload']);

//  use the config method to set up routing:
  myAppModule.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('logout', {
        url: '/logout',
        onEnter: function($state, userAuthFactory){
          if(!userAuthFactory.isLoggedIn()){
            $state.go('login');
          } else {
            userAuthFactory.logOut()
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'login.html',
        controller: 'userAuthController',
      })
      .state('home', {
        url: '/home',
        templateUrl: 'partials/home.html',
        onEnter: function($state, userAuthFactory){
          if(!userAuthFactory.isLoggedIn()){
            $state.go('login');
          }
        }
      })
      .state('about', {
        url: '/about',
        templateUrl: 'partials/about.html',
        onEnter: function($state, userAuthFactory){
          if(!userAuthFactory.isLoggedIn()){
            $state.go('login');
          }
        }
      })
      .state('clients', {
        url: '/clients',
        templateUrl: 'partials/clients.html',
        controller: 'clientController',
        onEnter: function($state, userAuthFactory){
          if(!userAuthFactory.isLoggedIn()){
            $state.go('login');
          }
        }
      })
      .state('patients', {
        url: '/patients',
        templateUrl: 'partials/patients.html',
        // controller: 'clientController', 
        controller: 'patientController',
        onEnter: function($state, userAuthFactory){
          if(!userAuthFactory.isLoggedIn()){
            $state.go('login');
          }
        }
      })
      .state('content', {
        url: '/content',
        templateUrl: 'partials/content.html',
        controller: 'contentController',
        onEnter: function($state, userAuthFactory){
          if(!userAuthFactory.isLoggedIn()){
            $state.go('login');
          }
        }
      })
      .state('mediaImages', {
        url: '/mediaImages',
        templateUrl: 'partials/mediaImages.html',
        controller: 'clientController',
        onEnter: function($state, userAuthFactory){
          if(!userAuthFactory.isLoggedIn()){
            $state.go('login');
          }
        }
      })
      .state('mediaVideo', {
        url: '/mediaVideo',
        templateUrl: 'partials/mediaVideo.html',
        controller: 'clientController',
        onEnter: function($state, userAuthFactory){
          if(!userAuthFactory.isLoggedIn()){
            $state.go('login');
          }
        }
      })
      .state('jsLib', {
        url: '/jsLib',
        templateUrl: 'partials/jsLibrary.html',
        onEnter: function($state, userAuthFactory){
          if(!userAuthFactory.isLoggedIn()){
            $state.go('login');
          }
        }
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'partials/admin.html',
        controller: 'adminController',
        onEnter: function($state, userAuthFactory){
          if(!userAuthFactory.isLoggedIn()){
            $state.go('login');
          }
        }
      })
  });