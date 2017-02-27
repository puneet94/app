(function(angular){
  'use strict';
  angular.module('app.product')
    .controller('ProductsLocationController',["$scope","$stateParams","getCityProductAreasService","getCityProductCategoriesService",'paramFactory', '$mdDialog',ProductsLocationController]);

  function ProductsLocationController($scope,$stateParams,getCityProductAreasService,getCityProductCategoriesService,paramFactory, $mdDialog){
    var plc = this;
    plc.location = $stateParams.location;
    plc.productsSearchHeader = $stateParams.slug;
    plc.categoryRadioModel = {};
    plc.areaRadioModel = {};
    plc.areaFilterName = 'area';
    plc.categoryFilterName = 'category';
    plc.showFilterDialog = showFilterDialog;
    plc.paramData = {
      city: plc.location,
      page: 1,
      limit: 10,
      fields: '-store'
    };

    paramFactory.setParamData(plc.paramData);

    $scope.$on('filterClicked', function() {

      plc.paramData = paramFactory.getParamData();

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
              'filterName': plc.areaFilterName,
              'filterNames': plc.areas,
              'filterModel': plc.areaRadioModel
            }, {
              'filterName': plc.categoryFilterName,
              'filterNames': plc.categories,
              'filterModel': plc.categoryRadioModel
            }]
          }
        })
        .then(function(answer) {
          console.log(answer);
        }, function() {

        });



    }
    getCityProductAreasService.getCityAreas(plc.location)
      .then(function(res) {
        plc.areas = res.data;
      }, function(res) {
        console.log(res);
      });
    getCityProductCategoriesService.getCityCategories(plc.location)
      .then(function(res) {
        plc.categories = res.data;

      }, function(res) {
        console.log(res);
      });

  }
})(window.angular);
