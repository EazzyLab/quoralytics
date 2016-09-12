(function(){
  'use strict';

  angular.module('app', ['ngRoute'])


  .config(function($routeProvider, $locationProvider, $httpProvider){
    $routeProvider
      .when('/login',{
        controller  : 'LoginController',
        templateUrl : 'login/login.view.html',
        controllerAs  : 'vm'
      })
      .when('/register', {
        controller  : 'RegisterController',
        templateUrl : 'register/register.view.html',
        controllerAs  : 'vm'
      })
      // .when('/dashboard', {
      //   controller  : 'DashboardController',
      //   templateUrl : 'dashboard/dashboard.view.html',
      //   controllerAs  : 'vm'
      // })

      .otherwise({redirectTo : '/login'});

  })

})();
