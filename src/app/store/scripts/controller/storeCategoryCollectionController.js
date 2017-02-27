(function(angular) {
	'use strict';
	angular.module('app.store')

	.controller('StoreCategoryCollectionController', ["$scope", "$stateParams", "getCityAreasService", "getCityCategoriesService", 'paramFactory', '$mdDialog', StoreCategoryCollectionController]);

	function StoreCategoryCollectionController($scope, $stateParams, getCityAreasService, getCityCategoriesService, paramFactory, $mdDialog) {

		var sccc = this;
		sccc.location = $stateParams.location;
		sccc.storesSearchHeader = $stateParams.slug;
		sccc.areaRadioModel = {};
		sccc.areaFilterName = 'area';
		sccc.showFilterDialog = showFilterDialog;
		sccc.paramData = {
			city: sccc.location,
			page: 1,
			limit: 10,
			category: $stateParams.category
		};


		paramFactory.setParamData(sccc.paramData);

		$scope.$on('filterClicked', function() {

			sccc.paramData = paramFactory.getParamData();

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
							'filterName': sccc.areaFilterName,
							'filterNames': sccc.areas,
							'filterModel': sccc.areaRadioModel
						}]
					}
				})
				.then(function(answer) {
					console.log(answer);
				}, function() {

				});



		}

		getCityAreasService.getCityAreas(sccc.location)
			.then(function(res) {
				sccc.areas = res.data;
			}, function(res) {
				console.log(res);
			});
		getCityCategoriesService.getCityCategories(sccc.location)
			.then(function(res) {
				sccc.categories = res.data;

			}, function(res) {
				console.log(res);
			});


	}

})(window.angular);
