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
      .when('/dashboard', {
        controller  : 'DashboardController',
        templateUrl : 'dashboard/dashboard.view.html',
        controllerAs  : 'vm',
      })

      .otherwise({redirectTo : '/login'});

      $httpProvider.interceptors.push('authInterceptor');

  })

  .factory('authInterceptor', function($rootScope, $q, $location, AuthTokenService){
  return {

    //Add JWT to headers
    request: function(config){
      config.headers = config.headers || {};
      var token = AuthTokenService.GetToken();
      if(token){
        config.headers['x-access-token'] = token;
        console.log('Injecting token');
      }
      return config;
    },

    //Intercept 403 and redirect to login
    responseError: function(response){
      if(response.status == 403){
        AuthTokenService.ClearToken();
        $location.path('/login');
        return $q.reject(response);
      }
      return $q.reject(response);
    }
  }
})

})();
