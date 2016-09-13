(function(){
  'use strict';

  angular
    .module('app')
    .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http){
      var service = {};

      service.Create = Create;
      service.Connect = Connect;

      return service;

      function Create(user){
        return $http.post('api/register', user).then(handleSuccess, handleError('Error creating user'));
      }

      function Connect(username, password){
        return $http.post('api/login', {username:username, password:password}).then(handleSuccess, handleError('Error connecting'));
      }

      //private functions

      function handleSuccess(res){
        console.log(res.data)
        return res.data;
      }

      function handleError(error){
        return function(){
          console.log(res.data)
          return {success : false, message : error};
        };
      }


    }
})();
