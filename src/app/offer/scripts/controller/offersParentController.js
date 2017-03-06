(function(angular) {
  'use strict';
  angular.module('app.offer')
    .controller('OffersParentController', ["$scope", "$stateParams", OffersParentController]);

  function OffersParentController($scope, $stateParams) {
    var ocp = this;
    ocp.changeDistance = function(){
    	console.log(ocp.distance);
    };
    activate();
    
    
    
    function activate() {
      
    }

  }




})(window.angular);
