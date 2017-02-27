(function(angular) {
	'use strict';

	angular.module('app.store', []).config(['$stateProvider',
		function($stateProvider) {
			$stateProvider
				.state('tabs.storesCollectionName', {
					url: '/store/storesCollection/storeName/:storeName/:location',
					views: {
						'store-tab': {
							templateUrl: 'app/store/views/storesNameCollection.html',
							controller: 'StoreNameCollectionController',
							controllerAs: 'sncc'
						}
					}

				}).state('tabs.storesCollectionCategory', {
					url: '/store/storesCollection/category/:category/:location',
					views: {
						'store-tab': {
							templateUrl: 'app/store/views/storesCategoryCollection.html',
							controller: 'StoreCategoryCollectionController',
							controllerAs: 'sccc'
						}
					}

				}).state('tabs.storesCollectionLocation', {
					url: '/store/storesCollection/location/:location',
					views: {
						'store-tab': {
							templateUrl: 'app/store/views/storesLocationCollection.html',
							controller: 'StoreLocationCollectionController',
							controllerAs: 'slcc'
						}
					}

				}).state('tabs.singleStorePage', {
					url: '/store/singleStore/:storeId',
					views: {
						'store-tab': {
							templateUrl: 'app/store/views/singleStore.html',
							controller: 'SingleStoreController',
							controllerAs: 'ssc'
						}
					}

				});
		}
	]);

})(window.angular);
