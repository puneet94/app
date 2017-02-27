(function(angular) {
  'use strict';
  angular.module('app.offer')
    .controller('OffersCollectionController', ["$scope", "$auth", "$stateParams", OffersCollectionController]);

  function OffersCollectionController($scope, $auth, $stateParams) {
    var occ = this;
    occ.pageNo = 0;

    occ.offersList = [];
    
    
    occ.paramData = {
      city: $stateParams.location,
      page: 1,
      limit: 10
    };
    activate();
    
    
    
    function activate() {
      
    }

  }




})(window.angular);
