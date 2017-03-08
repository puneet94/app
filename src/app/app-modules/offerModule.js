(function(angular) {
	'use strict';
	angular.module('app.offer', []).config(['$stateProvider',
		function($stateProvider) {
			$stateProvider.
			state('tabs.offers', {
				url: '/offers',
				abstract: true,
				views: {
					'offer-tab': {
						templateUrl: 'app/offer/views/offersCollectionParent.html',
						controller: 'OffersParentController',
						controllerAs: 'ocp'
					}
				},
				resolve:{
					positions: ['userLocationService',function(userLocationService){
						return userLocationService.getUserLocation();
					}]
				}
				
			}).
			state('tabs.offers.offersCollectionLocation', {
				views: {
					'offer-tab': {
						templateUrl: 'app/offer/views/offersCollection.html',
				controller: 'OffersPageController',
				controllerAs: 'ospc'
			}},
				url: '/offersCollection/:location',
				
					
			}).
			state('offerPage', {
				url: '/offer/:offerId',
				templateUrl: 'app/offer/views/offerPage.html',
				controller: 'OfferPageController',
				controllerAs: 'opc'
			});
		}
	]);

})(window.angular);
//productsCollection/";
//productsCollectionCategory/";
//productsCollectionSubCategory/";
//product/singleProductName/necklace12/hyderabad/necklace12-products-in-hyderabad
