(function(angular) {
	'use strict';
	angular.module('app.offer')
		.controller('OfferPageController', ["$scope", "$auth", "$stateParams", "changeBrowserURL", 'offerService', 'baseUrlService','Socialshare',OfferPageController]);

	function OfferPageController($scope, $auth, $stateParams, changeBrowserURL, offerService,baseUrlService,Socialshare) {
		var opc = this;
		opc.offerData = {};
		activate();
		opc.shareFacebook = shareFacebook;
		console.log("sd"+baseUrlService.currentUrlWQ);
		function shareFacebook() {
			Socialshare.share({
				'provider': 'facebook',
				'attrs': {
					'socialshareUrl': baseUrlService.currentUrlWQ,
					'socialshareText' :"Offline Offers",
					"socialshareVia":"1068203956594250"
				}
			});
		}

		function activate() {
			offerService.getSingleOffer($stateParams.offerId)
				.then(function(res) {
					console.log("single offer");
					console.log(res);
					opc.offerData = res.data;
					if (opc.offerData.address.latitude) {
						opc.pos = [opc.offerData.address.latitude, opc.offerData.address.longitude];
					} else {
						opc.pos = [17.361625, 78.474622];
					}
				}, function(res) {
					console.log(res);
				}).catch(function(e) {
					console.log('Error: ', e);

				}).finally(function() {
					console.log('This finally block');
				});

		}



	}




})(window.angular);
