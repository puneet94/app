(function(angular) {
  'use strict';
  angular.module('app.event')
    .directive('singleEventVertDirective', [singleEventVertDirective])
    .directive('singleEventDirective', [singleEventDirective]);

  function singleEventDirective() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/event/views/singleEventTemplate.html',
      scope: {
        event: '=singleEvent',
        'isAdminEvent': '@adminEvent'
      },
      link: function(scope, element, attrs) {

      },
      controller: function($scope) {
        $scope.eventDir = {
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
      }
    };
  }

function singleEventVertDirective() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/event/views/singleEventVertTemplate.html',
      scope: {
        event: '=singleEvent',
        
      },
      link: function(scope, element, attrs) {

      },
      controller: function($scope) {
        $scope.eventDir = {
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
      }
    };
  }

})(window.angular);
