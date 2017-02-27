(function(angular) {
  'use strict';
  angular.module('app.user')

  .controller('UserProfileSettingsController', ["$scope", "$auth", 'userData', 'userService',UserProfileSettingsController]);

  function UserProfileSettingsController($scope, $auth, userData,userService) {

    var usl = this;
    usl.authCheck = $auth.isAuthenticated();
    usl.updateUserProfile = updateUserProfile;
    activate();

    function activate() {
      usl.userForm = userData.getUser();
      console.log("user data");
      console.log(usl.userForm);
    }
    function updateUserProfile(){
      console.log("updated form");
      console.log(usl.userForm);
      userService.updateUser(usl.userForm).then(function(res){
        console.log(res);
        userData.setUser();
      },function(res){
        console.log(res);
      });
    }


  }




})(window.angular);
