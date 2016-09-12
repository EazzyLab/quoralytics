(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$rootScope', 'FlashService'];
    function RegisterController($location, $rootScope, FlashService) {
        var vm = this;


    }
    
})();
