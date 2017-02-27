(function(angular){
  'use strict';
  angular.module('app.store')
  .directive('singleStoreSuggestion',[ singleStoreSuggestion]);
  function singleStoreSuggestion() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl:'app/store/views/singleStoreSuggestion.html',
      scope:{
        suggestedStore: '=suggestedStore'
      }
    };
  }
  


})(window.angular);
