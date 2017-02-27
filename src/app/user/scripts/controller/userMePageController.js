(function(angular) {
  'use strict';
  angular.module('app.user')

  .controller('UserMePageController', ["$scope", "$auth", 'userData', UserMePageController]);

  function UserMePageController($scope, $auth, userData) {



    var umpc = this;
    umpc.loading = true;
    umpc.authCheck = $auth.isAuthenticated();
    activate();

    umpc.tab = 1;

    umpc.setTab = function(newTab) {
      umpc.tab = newTab;
      console.log("the tab");
      console.log(umpc.tab);
    };

    umpc.isSet = function(tabNum) {
      return umpc.tab === tabNum;
    };

    function activate() {

    }


  }




})(window.angular);
