(function(angular) {
	'use strict';
	angular.module('app.offer')
		.directive('offersList', [ offersList]);

	function offersList() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'app/offer/views/offersListTemplate.html',
			scope: {
				offersList: '=offersList'
			}
		};
	}



})(window.angular);
