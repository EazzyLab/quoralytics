(function(){
  'use strict';

  angular
    .module('app')
    .factory('AuthTokenService', AuthTokenService);

    AuthTokenService.$inject = ['$window'];
    function AuthTokenService($window){

      var service = {};

      service.GetToken = GetToken;
      service.SetToken = SetToken;
      service.ClearToken = ClearToken;

      return service;

      function GetToken(){
        return $window.localStorage.getItem('token');
      };

      function SetToken(token){
          $window.localStorage.setItem('token', token);
      };

      function ClearToken(){
        $window.localStorage.removeItem('token');
      };
    }
})();
