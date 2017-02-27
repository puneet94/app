(function(angular) {
  'use strict';
  angular.module('app.user')
    .directive('changePassword', [changePassword]);

  function changePassword() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/user/views/userChangePasswordTemplate.html',
      scope: {},
      link: function(scope, element, attrs) {

      },
      controllerAs: 'vm',
      controller: ['$scope', 'userService', function MyTabsController($scope, userService) {
        var vm = this;
        vm.user = {};
        vm.checkCurrentPassword = checkCurrentPassword;
        vm.changePassword = changePassword;

        function changePassword() {

          vm.passwordChangedValue = false;
          vm.showIncorrectPassword = false;
          userService
            .checkUserPassword({ 'password': vm.user.oldPassword })
            .then(function(res) {
              vm.passwordCheckValue = res.data;
              if (vm.passwordCheckValue) {
                userService
                  .changeUserPassword({ 'password': vm.user.password })
                  .then(function(res) {
                    console.log("the status");
                    console.log(res.data);
                    vm.passwordChangedValue = true;
                  });
              }
              else{
                vm.showIncorrectPassword = true;
                return;
              }
            });


          vm.showIncorrectPassword = false;
        }

        function checkCurrentPassword() {

        }
      }],
    };
  }

})(window.angular);
