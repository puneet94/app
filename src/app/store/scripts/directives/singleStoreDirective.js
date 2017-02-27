(function(angular){
  'use strict';
  angular.module('app.store')
  .directive('singleStore',[ singleStore]);
  function singleStore() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl:'app/store/views/singleStoreTemplate.html',
      scope:{
        store: '=store'
      },
      controller: ['$scope',function($scope){
      	$scope.getSingleStore = getSingleStore;

      	function getSingleStore(){

      	}
      }]
    };
  }
  


})(window.angular);
