(function(angular) {
	'use strict';
	angular.module('app.product', []).config(['$stateProvider',
		function($stateProvider) {
			$stateProvider.
			state('tabs.productsCollectionName', {
				url: '/productsCollectionName/:productName/:location',
				views: {
					'product-tab': {
						templateUrl: 'app/product/views/productsNameCollection.html',
						controller: 'ProductNameCollectionController',
						controllerAs: 'pncc'
					}
				}

			}).state('tabs.productsCollectionCategory', {
				url: '/productsCollectionCategory/:category/:location',
				views: {
					'product-tab': {
						templateUrl: 'app/product/views/productsCategoryCollection.html',
						controller: 'ProductCategoryCollectionController',
						controllerAs: 'pccc'
					}
				}

			}).state('tabs.productsCollectionSubCategory', {
				url: '/productsCollectionSubCategory/:subCategory/:location',
				views: {
					'product-tab': {
						templateUrl: 'app/product/views/productsSubCategoryCollection.html',
						controller: 'ProductSubCategoryCollectionController',
						controllerAs: 'pscc'
					}
				}

			}).state('tabs.singleProductPage', {
				url: '/product/singleProduct/:productId',
				views: {
					'product-tab': {
						templateUrl: 'app/product/views/singleProduct.html',
						controller: 'SingleProductController',
						controllerAs: 'spc'
					}
				}

			}).state('tabs.productsCollectionLocation', {
				url: '/productsCollectionLocation/:location',
				views: {
					'product-tab': {
						templateUrl: 'app/product/views/productsLocationCollection.html',
						controller: 'ProductsLocationController',
						controllerAs: 'plc'
					}
				}

			});
		}
	]);

})(window.angular);
//productsCollection/";
//productsCollectionCategory/";
//productsCollectionSubCategory/";
//product/singleProductName/necklace12/hyderabad/necklace12-products-in-hyderabad
