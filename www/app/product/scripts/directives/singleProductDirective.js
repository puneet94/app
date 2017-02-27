
(function(angular){
  'use strict';
  angular.module('app.product')
  .directive('singleProductDirective',['$mdDialog',singleProductDirective]);
  
  function singleProductDirective($mdDialog){
    return {
      restrict: 'E',
      replace: true,
      templateUrl:'app/product/views/singleProductTemplate.html',
      scope:{
        product:'=singleProduct',
        adminProduct: '@adminProduct'
      },
      link: function(scope,element,attrs){

      },
      controller: ['$scope',function($scope){
        $scope.showProductEditModal = showProductEditModal;

        function showProductEditModal(product,ev){
          $mdDialog.show({
          controller: 'EditProductController',
          templateUrl: 'app/admin/views/adminEditProduct.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          controllerAs: 'csc',
          clickOutsideToClose: true,
          fullscreen: true,
          locals: {
            product: product
          }
        })
        .then(function(answer) {
          console.log(answer);
        }, function() {

        });



        }
      }]
    };
  }
  

})(window.angular);
