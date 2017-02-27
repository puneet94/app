(function(angular) {
	'use strict';
	angular.module('app.product')
		.directive('productsList', ['getProductCollectionService','paramFactory' ,productsList]);

	function productsList(getProductCollectionService,paramFactory) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'app/product/views/productListTemplate.html',
			scope: {
				paramData: '=paramData',
				adminProduct: '@adminProduct'
			},
			controller: ['$scope', function($scope) {
				$scope.productsList = [];
				$scope.loadMoreProducts = loadMoreProducts;
				$scope.getProducts = getProducts;
				$scope.paramData = paramFactory.getParamData();
				activate();
				$scope.$on('filterClicked', function() {
					$scope.productsList = [];
					$scope.paramData = paramFactory.getParamData();
					getProducts();
				});

				function loadMoreProducts() {
					$scope.paramData.page = $scope.paramData.page + 1;
					paramFactory.setParamData($scope.paramData);
					getProducts();
				}

				function getProducts() {
					$scope.loading = true;
					getProductCollectionService.productsCollection($scope.paramData).then(function(response) {
						if (response.data.docs.length === 0) {
							$scope.noProductsToShow = true;
						}
						else{
           						$scope.noProductsToShow = false; 
          					}
						$scope.totalProducts = response.data.total;

						angular.forEach(response.data.docs, function(value) {
							$scope.productsList.push(value);
						});
						
						$scope.loading = false;

					}).catch(function(error) {
						console.log('error');
						console.log(error);
					});
				}

				function activate() {
					getProducts();
				}
			}]
		};
	}


})(window.angular);
