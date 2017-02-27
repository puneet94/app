(function(angular){
  'use strict';
angular.module('app.product')
  .controller('StoreProductListController',["$scope","$stateParams",StoreProductListController]);
  function StoreProductListController($scope,$stateParams){
    var splc = this;
    splc.paramData = {
      page: 1,
      limit: 10,
      fields: '-store',
      store: $stateParams.storeId
    };
    
  }

})(window.angular);
