(function(angular) {
	'use strict';
	angular.module('app.event')
		.controller('EventPageController', ["$scope", "$auth", "$stateParams", "changeBrowserURL", 'eventService', 'baseUrlService','Socialshare',EventPageController]);

	function EventPageController($scope, $auth, $stateParams, changeBrowserURL, eventService,baseUrlService,Socialshare) {
		var opc = this;
		opc.eventData = {};
		activate();
		opc.shareFacebook = shareFacebook;
		console.log("sd"+baseUrlService.currentUrlWQ);
		function shareFacebook() {
			Socialshare.share({
				'provider': 'facebook',
				'attrs': {
					'socialshareUrl': baseUrlService.currentUrlWQ,
					'socialshareText' :"Offline Events",
					"socialshareVia":"1068203956594250"
				}
			});
		}

		function activate() {
			eventService.getSingleEvent($stateParams.eventId)
				.then(function(res) {
					console.log("single event");
					console.log(res);
					opc.eventData = res.data;
					if (opc.eventData.address.latitude) {
						opc.pos = [opc.eventData.address.latitude, opc.eventData.address.longitude];
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
