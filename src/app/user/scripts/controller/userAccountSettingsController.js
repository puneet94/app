//inject angular file upload directives and services.
(function(angular) {
  'use strict';
  angular.module('app.user')
    .controller('UserAccountSettingsController', ['$scope','$auth', '$window','userData', 'changeBrowserURL', UserAccountSettingsController]);

  function UserAccountSettingsController($scope,$auth,$window ,userData, changeBrowserURL) {
    var uasc = this;
    uasc.getUserPage = getUserPage;
    uasc.getAdminStore = getAdminStore;
    uasc.createNewStore = createNewStore;
    uasc.authLogout = authLogout;
    uasc.authCheck = $auth.isAuthenticated() && (!userData.getUser().facebook);
    activate();

    function getAdminStore(storeId) {
      changeBrowserURL.changeBrowserURLMethod('/admin/adminStorePage/' + storeId);
    }

    function getUserPage() {
      userData.getUserPage(userData.getUser()._id);
    }

    function authLogout() {
      $auth.logout();
      userData.removeUser();
      $window.location.reload();
    }

    function createNewStore() {
      changeBrowserURL.changeBrowserURLMethod('/admin/createStore/');
    }


    function activate() {
      uasc.user = userData.getUser();
      uasc.userProfilePic = userData.getUser().picture;
      uasc.userStoresList = userData.getUser().storeId;

    }
  }
})(window.angular);
