(function(angular){
  'use strict';
  angular.module('app.store')

    .controller('UserStoreFollowController',["$scope","$auth","$stateParams","userData","userFollowService",UserStoreFollowController]);

    function UserStoreFollowController($scope,$auth,$stateParams,userData,userFollowService){
      var usu = this;
      usu.follow = {};
      usu.followCheck = false;
      usu.getFollowParamObj = {};
      usu.submitFollow = submitFollow;
      usu.deleteFollow = deleteFollow;
      usu.getFollowParamObj.userId = userData.getUser()._id;
      usu.userStoreFollowed = false;

      activate();      
      function userStoreFollowed(){        
      }
      function submitFollow(){
        userFollowService.submitFollow(usu.follow)
            .then(function(res){
                    usu.userStoreFollowed = true;
                    userData.setUser();
                    
                  },
                  function(res){
                    console.log(res);
                  });
      }
      function deleteFollow(){
        userFollowService.deleteFollow(usu.follow)
            .then(function(res){
              usu.userStoreFollowed = false;
              userData.setUser();
              console.log(res);             
            },
              function(res)
              {
                console.log(res);
              });
      }
      
      function activate(){
       
       usu.follow.userId = userData.getUser()._id;
        if($stateParams.storeId){
        usu.entity = $stateParams.storeId;
        usu.follow.storeId = $stateParams.storeId;
        
      }
      else if($stateParams.productId){
        usu.entity = $stateParams.productId;
        usu.follow.productId = $stateParams.productId;
        usu.getFollowParamObj.productId = $stateParams.productId;
      }
      if($auth.isAuthenticated()){
        if(userData.getUser().storeFollowing.indexOf($stateParams.storeId)!=-1){
          usu.userStoreFollowed = true;
        }
        
      }
      }

    }

})(window.angular);
