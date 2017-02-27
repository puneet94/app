(function(angular) {
	'use strict';
	angular.module('app.offer')
		.directive('offersList', ['offerService', offersList]);

	function offersList(offerService) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'app/offer/views/offersListTemplate.html',
			scope: {
				paramData: '=paramData'
			},
			
			controller: ['$scope',function($scope) {
				$scope.offersList = [];
				$scope.loadMoreOffers = loadMoreOffers;
				$scope.getOffers = getOffers;
				activate();
				$scope.$on('filterClicked', function() {
					$scope.offersList = [];
					$scope.paramData.page = 1;
					getOffers();
				});

				function loadMoreOffers() {
					$scope.paramData.page = $scope.paramData.page + 1;
					getOffers();
				}

				function getOffers() {
					$scope.spinnerLoading = true;
					console.log("paramdata");
					console.log($scope.paramData);
					offerService.getOfferCollection($scope.paramData).then(function(response) {
						console.log(response);
						$scope.totalOffers = response.data.total;
						
						angular.forEach(response.data.docs, function(value) {
							$scope.offersList.push(value);
						});
						
						$scope.spinnerLoading = false;

					}).catch(function(error) {
						console.log('error');
						console.log(error);
					});
				}

				function activate() {
					getOffers();
				}


			}]
		};
	}



})(window.angular);
