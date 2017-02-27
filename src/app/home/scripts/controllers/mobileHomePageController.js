(function(angular){
	'use strict';

	angular.module('app.home')
	.controller('MobileHomePageController',["$scope","$state", MobileHomePageController]);

	function MobileHomePageController($scope,$state){
			var mhpc = this;
			mhpc.openEntitySearchPage = openEntitySearchPage;
			
			function openEntitySearchPage(){
				$state.go('entitySearchPage');
			}
			
	  
	}

})(window.angular);
