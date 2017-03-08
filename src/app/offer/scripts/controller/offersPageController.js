(function(angular) {
	'use strict';
	angular.module('app.offer')
		.controller('OffersPageController', ["$scope", "$stateParams", 'offerService', 'positions', OffersPageController]);

	function OffersPageController($scope, $stateParams, offerService, positions) {
		var opc = this;

		activate();
		opc.paramData = {
			city: $stateParams.location,
			page: 1,
			limit: 10
		};
		function activate() {
			offerService.getOfferCollection(opc.paramData).then(function(response) {
				console.log(response);
				opc.totalOffers = response.data.total;

				angular.forEach(response.data.docs, function(value) {
					opc.offersList.push(value);
				});
			}).catch(function(error) {
				console.log('error');
				console.log(error);
			});
		}



	}




})(window.angular);
