(function(){
  'use strict';
  angular
    .module('app')
    .controller('DashboardController', DashboardController)

    DashboardController.$inject = ['QuoraService','FlashService'];
    function DashboardController(QuoraService, FlashService){

    var vm = this;

    vm.updateStats = updateStats;

    // initController();
    //
    // function initController(){
    //   updateStats()
    // }

    function updateStats(){
      QuoraService.UpdateStats()
        .success(function(data){
          vm.totalViews = data.totalViews;
          vm.totalViewsChange = data.totalViewsChange;
          if(data.success){
            FlashService.Success('Stats freshly updated !', false);
          } else {
            FlashService.Error(data.message, false);
          }
        });
      };
    }
})();
