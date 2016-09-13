(function(){
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function LoginController($location, AuthenticationService, FlashService){

      var vm = this;

      vm.login = login;

      function login(){
        vm.dataLoading = true;
        AuthenticationService.Login(vm.username, vm.password)
          .success(function(data){
            vm.dataLoading = false;
            if(data.success){
              console.log(data);
              $location.path('/dashboard');
            } else {
              FlashService.Error(data.message);
            }
          });
        }
      }
})();
