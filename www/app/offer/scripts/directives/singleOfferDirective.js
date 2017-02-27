(function(angular) {
  'use strict';
  angular.module('app.offer')
    .directive('singleOfferVertDirective', [singleOfferVertDirective])
    .directive('singleOfferDirective', [singleOfferDirective]);

  function singleOfferDirective() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/offer/views/singleOfferTemplate.html',
      scope: {
        offer: '=singleOffer',
        'isAdminOffer': '@adminOffer'
      },
      link: function(scope, element, attrs) {

      },
      controller: ['$scope',function($scope) {
        $scope.offerDir = {
          mapAddress: mapAddress
        };

        function mapAddress(addressObj) {
          return Object.keys(addressObj).map(function(key, index) {
            if((key!= 'latitude') && (key!='longitude') && (key!='_id')){
              console.log(key);
              return addressObj[key];  
            }
            
          });
        }
      }]
    };
  }

function singleOfferVertDirective() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/offer/views/singleOfferVertTemplate.html',
      scope: {
        offer: '=singleOffer',
        
      },
      link: function(scope, element, attrs) {

      },
      controller: ['$scope',function($scope) {
        $scope.offerDir = {
          mapAddress: mapAddress
        };

        function mapAddress(addressObj) {
          return Object.keys(addressObj).map(function(key, index) {
            if((key!= 'latitude') && (key!='longitude') && (key!='_id')){
              console.log(key);
              return addressObj[key];  
            }
            
          });
        }
      }]
    };
  }

})(window.angular);
