(function(angular) {
  'use strict';
  angular.module('app.offer')
    .directive('offerSuggestionList', ['offerService',offerSuggestionList]);

  function offerSuggestionList(offerService) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/offer/views/offerSuggestionListTemplate.html',
      scope: {
                offerLimit: '=offerLimit',
                offerCity: '=offerCity'
      },
      link: function(scope, element, attrs) {

      },
      controller: ['$scope',function($scope) {
        var offerParamData = {
          page: 1,
          limit: $scope.offerLimit,
          city: $scope.offerCity
        };
        offerService.getOfferCollection(offerParamData).then(function(response){
          console.log("offers");
          console.log(response);
          $scope.offerSuggestions = response.data.docs;
        },function(response){
          console.log('error');
          console.log(response);
        });
        $scope.offerDir = {

        };


      }]
    };
  }


})(window.angular);
