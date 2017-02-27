(function(angular) {
  'use strict';
  angular.module('app.event')
    .directive('eventSuggestionList', ['eventService',eventSuggestionList]);

  function eventSuggestionList(eventService) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/event/views/eventSuggestionListTemplate.html',
      scope: {
                eventLimit: '=eventLimit',
                eventCity: '=eventCity'
      },
      link: function(scope, element, attrs) {

      },
      controller: function($scope) {
        var eventParamData = {
          page: 1,
          limit: $scope.eventLimit,
          city: $scope.eventCity
        };
        eventService.getEventCollection(eventParamData).then(function(response){
          console.log("events");
          console.log(response);
          $scope.eventSuggestions = response.data.docs;
        },function(response){
          console.log('error');
          console.log(response);
        });
        $scope.eventDir = {

        };


      }
    };
  }


})(window.angular);
