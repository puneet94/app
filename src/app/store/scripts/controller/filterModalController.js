(function(angular) {
	'use strict';
	angular.module('app.store')

	.controller('FilterModalController', ["$scope", '$mdDialog','filtersList',FilterModalController]);

	function FilterModalController($scope,$mdDialog,filtersList) {
		$scope.cancelDialog = cancelDialog;
		
		$scope.filtersList = filtersList;
		console.log("yoyooyy");
		console.log($scope.filtersList);
		function cancelDialog() {
			$mdDialog.cancel();
		}



	}

})(window.angular);
