(function(angular) {
  'use strict';
  angular.module('app.offer')
    .directive('singleOfferSuggestion', [singleOfferSuggestion]);

  function singleOfferSuggestion() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/offer/views/singleOfferSuggestionTemplate.html',
      scope: {
        suggestedOffer: '=suggestedOffer'
      },
      link: function(scope, element, attrs) {

      },
      controller: ['$scope',function($scope) {
        $scope.offerDir = {

        };


      }]
    };
  }


})(window.angular);
