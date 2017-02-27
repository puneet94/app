(function(angular){
  'use strict';
angular.module('app.user')

  .controller('UserFollowersController',["$scope","$auth",'$location','$stateParams',"userData","userService",UserFollowersController]);
  function UserFollowersController($scope,$auth,$location,$stateParams,userData,userService){
    var ufc = this;
    activate();

    ufc.loading = true;
    ufc.authCheck = $auth.isAuthenticated();
    ufc.followersList = [];
    ufc.currentUserFollowed = currentUserFollowed;
    ufc.submitUserFollow = submitUserFollow;
    ufc.deleteUserFollow = deleteUserFollow;
    ufc.getUserPage = userData.getUserPage;

    function activate(){
      ufc.loading = true;

      userService.getUserFollowers($stateParams.userId)
    .then(function(res){
        ufc.followersList = res.data;
        
        ufc.loading = false;
      });
    }
    function submitUserFollow(followerId){
      userService.submitUserFollow(userData.getUser()._id,followerId).then(function(response){

        
        userData.setUser();
      });
    }
    function deleteUserFollow(followerId){
      userService.deleteUserFollow(userData.getUser()._id,followerId).then(function(response){
        
        userData.setUser();
      });
    }
    function currentUserFollowed(follower){
if(ufc.authCheck){
      if(userData.getUser().following.indexOf(follower)==-1){
        return false;
      }
      return true;
    }}

    }

})(window.angular);
