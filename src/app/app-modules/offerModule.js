(function(angular){
  'use strict';
angular.module('app.offer',[]).config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.
      state('offersLocation', {
        url: '/offers/:location/:slug?',
        templateUrl: 'app/offer/views/offersPage.html',
        controller: 'OffersPageController',
        controllerAs: 'ospc'
      }).
      state('offerPage', {
        url: '/offer/:offerId',
        templateUrl: 'app/offer/views/offerPage.html',
        controller: 'OfferPageController',
        controllerAs: 'opc'
      });
  }]);

})(window.angular);
//productsCollection/";
//productsCollectionCategory/";
//productsCollectionSubCategory/";
//product/singleProductName/necklace12/hyderabad/necklace12-products-in-hyderabad