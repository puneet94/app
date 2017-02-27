(function(angular) {
  'use strict';
  angular.module('app.event')
    .directive('singleEventSuggestion', [singleEventSuggestion]);

  function singleEventSuggestion() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/event/views/singleEventSuggestionTemplate.html',
      scope: {
        suggestedEvent: '=suggestedEvent'
      },
      link: function(scope, element, attrs) {

      },
      controller: function($scope) {
        $scope.eventDir = {

        };


      }
    };
  }


})(window.angular);
