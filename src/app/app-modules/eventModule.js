(function(angular){
  'use strict';
angular.module('app.event',[]).config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.
      state('eventsLocation', {
        url: '/events/:location/:slug?',
        templateUrl: 'app/event/views/eventsPage.html',
        controller: 'EventsPageController',
        controllerAs: 'ospc'
      }).
      state('eventPage', {
        url: '/event/:eventId',
        templateUrl: 'app/event/views/eventPage.html',
        controller: 'EventPageController',
        controllerAs: 'opc'
      });
  }]);

})(window.angular);
//productsCollection/";
//productsCollectionCategory/";
//productsCollectionSubCategory/";
//product/singleProductName/necklace12/hyderabad/necklace12-products-in-hyderabad