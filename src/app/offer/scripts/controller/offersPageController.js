(function(angular) {
	'use strict';
	angular.module('app.offer')
		.controller('OffersPageController', ["$scope", "$stateParams", 'offerService', 'positions', OffersPageController]);

	function OffersPageController($scope, $stateParams, offerService, positions) {
		var opc = this;

		
		opc.offersList = [];
		opc.loadOffers = loadOffers;
		opc.loadMore = loadMore;

		opc.paramData = {
			nearby: true,
			page: 1,
			limit: 10,
			longitude: positions.longitude,
			latitude: positions.latitude,
			distance: 6000
		};

		$scope.$on('distanceChanged',function(distance){
			opc.paramData.distance = distance;
			opc.loadOffers();
		});
		function loadMore(){
			opc.paramData.page +=1;
			opc.loadOffers();
		}
		function loadOffers(){
			
			offerService.getOfferCollection(opc.paramData).then(function(response) {
				console.log("params");
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
		function activate() {
			loadOffers();
		}
		activate();
	}




})(window.angular);
