(function(angular) {
  'use strict';
  angular.module('app.offer')
    .controller('OffersParentController', ["$scope", "$stateParams", 'positions',OffersParentController]);

  function OffersParentController($scope, $stateParams,positions) {
    var ocp = this;
    ocp.changeDistance = function(){
    	console.log(ocp.distance);
      
    };
    activate();
    
    function activate() {
      
    }

  }




})(window.angular);
