(function(angular){
  'use strict';
  angular.module('app.store')

    .controller('UserStoreUpvoteController',["$scope","$auth","$stateParams","userData","userUpvoteService",'storeData',UserStoreUpvoteController]);

    function UserStoreUpvoteController($scope,$auth,$stateParams,userData,userUpvoteService,storeData){
      var usu = this;
      usu.upvote = {};
      usu.upvoteCheck = false;
      usu.getUpvoteParamObj = {};
      usu.submitUpvote = submitUpvote;
      usu.deleteUpvote = deleteUpvote;
      usu.getUpvoteParamObj.userId = userData.getUser()._id;
      usu.userStoreUpvoted = false;

      activate();      
      function userStoreUpvoted(){        
      }
      function submitUpvote(){
        userUpvoteService.submitUpvote(usu.upvote)
            .then(function(res){
                    usu.userStoreUpvoted = true;
                    userData.setUser();
                    
                  },
                  function(res){
                    console.log(res);
                  });
      }
      function deleteUpvote(){
        userUpvoteService.deleteUpvote(usu.upvoteId)
            .then(function(res){
              usu.userStoreUpvoted = false;
              userData.setUser();
            },
              function(res)
              {
                console.log(res);
              });
      }
      
      function activate(){
        usu.upvote.userId = userData.getUser()._id;
        if($stateParams.storeId){
          usu.upvote.storeId = $stateParams.storeId;
          usu.upvote.type="store";
        }
        else if($stateParams.productId){
          usu.upvote.type="product";
          usu.upvote.productId = $stateParams.productId;
        
        }
        if($auth.isAuthenticated()){
          var currentStore = storeData.getStore();
          var currentUser = userData.getUser();
          for (var i = 0; i < currentStore.upvotes.length; i++) {
            for (var j = 0; j < currentUser.upvotes.length; j++) {
              if(currentStore.upvotes[i] == currentUser.upvotes[j]){
                usu.userStoreUpvoted = true;
                usu.upvoteId = currentStore.upvotes[i];
                console.log(usu.upvoteId);
              }
            }
            
          }
        }
      }

    }

})(window.angular);
