(function(angular) {
	'use strict';
	angular.module('app.store')
		.controller('StoreLocationCollectionController', ["$scope",'$state', "$stateParams", "getCityAreasService", "getCityCategoriesService", 'paramFactory', '$mdDialog', StoreLocationCollectionController]);

	function StoreLocationCollectionController($scope, $state,$stateParams, getCityAreasService, getCityCategoriesService, paramFactory, $mdDialog) {

		var slcc = this;
		slcc.location = $stateParams.location;
		slcc.categoryRadioModel = {};
		slcc.categoryFilterName = 'category';
		slcc.storesSearchHeader = $stateParams.slug;
		slcc.showFilterDialog = showFilterDialog;
		slcc.areaRadioModel = {};
		slcc.areaFilterName = 'area';
		slcc.paramData = {
			city: slcc.location,
			page: 1,
			limit: 5
		};
		

		paramFactory.setParamData(slcc.paramData);

		$scope.$on('filterClicked', function() {

			slcc.paramData = paramFactory.getParamData();

		});

		function showFilterDialog(ev) {
			$mdDialog.show({
					controller: 'FilterModalController',
					templateUrl: 'app/store/views/filterModalTemplate.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: true,
					fullscreen: true,
					locals: {
						filtersList: [{
							'filterName': slcc.areaFilterName,
							'filterNames': slcc.areas,
							'filterModel': slcc.areaRadioModel
						}, {
							'filterName': slcc.categoryFilterName,
							'filterNames': slcc.categories,
							'filterModel': slcc.categoryRadioModel
						}]
					}
				})
				.then(function(answer) {
					console.log(answer);
				}, function() {

				});



		}
		activate();




		function activate() {
			getCityAreasService.getCityAreas(slcc.location)
				.then(function(res) {
					slcc.areas = res.data;
				}, function(res) {
					console.log(res);
				});
			getCityCategoriesService.getCityCategories(slcc.location)
				.then(function(res) {
					slcc.categories = res.data;

				}, function(res) {
					console.log(res);
				});
		}



	}
})(window.angular);
