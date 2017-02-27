(function(angular) {
	'use strict';
	angular.module('app.offer')
		.controller('OffersPageController', ["$scope", "$auth", "$stateParams", "changeBrowserURL", "baseUrlService", OffersPageController]);

	function OffersPageController($scope, $auth, $stateParams, changeBrowserURL, baseUrlService) {
		var opc = this;

		activate();

		function activate(){

		}
		
		

	}




})(window.angular);
