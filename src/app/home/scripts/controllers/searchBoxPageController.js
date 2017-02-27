(function(angular){
	'use strict';

	angular.module('app.home')
	.controller('SearchBoxPageController',["$scope","$state", '$ionicHistory','cityStorage' ,SearchBoxPageController]);

	function SearchBoxPageController($scope,$state,$ionicHistory,cityStorage){
			var phc = this;
			phc.citySearchModel = cityStorage.getCity();
			phc.openCityPage = function(){
			    $state.go('citySearchPage');
			};
			phc.openEntityPage = function(){
			    $state.go('entitySearchPage');
			};
			phc.goBack = function(){
			    $ionicHistory.goBack();
			};
			
            
	    	
	}

})(window.angular);
