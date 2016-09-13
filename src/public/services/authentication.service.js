(function(){
  'use strict';

  angular
    .module('app')
    .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http','$q', '$rootScope','UserService', 'AuthTokenService'];
    function AuthenticationService($http, $q, $rootScope, UserService, AuthTokenService){

      var service = {};

      service.Login = Login;
      service.IsLoggedIn = IsLoggedIn;
      service.Logout = Logout;

      return service;


      function Login(username, password){
        return $http.post('/api/login', {
          username:username,
          password:password
        }).success(function(data){
          AuthTokenService.SetToken(data.token);
          return data;
        });
      };

      function IsLoggedIn(){
        var token = AuthTokenService.GetToken();
        console.log(token);
        if(token == null){
          console.log('User is not logged in');
          return false;
        } else {
          console.log('User is logged in');
          return true;
        }
      };

      function Logout(){
        AuthTokenService.ClearToken();
        console.log(AuthTokenService.GetToken());
      };

    }
})();
