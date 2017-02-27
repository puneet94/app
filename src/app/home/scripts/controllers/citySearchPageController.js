(function(angular){
	'use strict';

	angular.module('app.home')
	.controller('CitySearchPageController',["$scope","$state", '$stateParams', 'cityStorage', 'citiesService','$ionicHistory',CitySearchPageController]);

	function CitySearchPageController($scope,$state,$stateParams, cityStorage, citiesService,$ionicHistory){
			var phc = this;
			activate();
			if ($stateParams.location) {
                phc.citySearchModel = $stateParams.location;
            } else if (cityStorage.isCityExists()) {
                phc.citySearchModel = cityStorage.getCity();
            } else {
                phc.citySearchModel = 'hyderabad';
            }
            phc.itemSelected = itemSelected;
            phc.closeCitySearchPage = closeCitySearchPage;
            phc.goBackPage = goBackPage;
            
            function goBackPage(){
                
                 $ionicHistory.goBack();
            }
            function closeCitySearchPage(){
                $state.go('tabs.home');
            }
            function itemSelected(item){
                cityStorage.setCity(item);
                $state.go('entitySearchPage');
            }
	        function activate() {
                citiesService.getCities()
                    .then(function(obj) {
                        console.log("the city daa",obj);
                        phc.citySearchItems = obj.data;
                }, function(obj) {
                    console.log(obj);
                });
            }
	    	
	}

})(window.angular);
