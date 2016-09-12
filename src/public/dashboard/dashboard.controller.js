(function(){
  'use strict';
  angular
    .module('app')
    .controller('DashboardController', DashboardController)

    DashboardController.$inject = ['QuoraService','FlashService'];
    function DashboardController(QuoraService, FlashService){

    var vm = this;


    }
})();
