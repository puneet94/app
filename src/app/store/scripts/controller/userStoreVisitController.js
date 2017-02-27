(function(angular){
  'use strict';
  angular.module('app.store')

    .controller('UserStoreVisitController',["$scope","$auth","$stateParams","userData","userVisitService",UserStoreVisitController]);

    function UserStoreVisitController($scope,$auth,$stateParams,userData,userVisitService){
      var usv = this;
      usv.visit = {};
      usv.visitCheck = false;
      usv.getVisitParamObj = {};
      usv.submitVisit = submitVisit;
      usv.deleteVisit = deleteVisit;
      usv.getVisitParamObj.userId = userData.getUser()._id;
      usv.userStoreVisited = false;

      activate();      
      function userStoreVisited(){        
      }
      function submitVisit(){
        userVisitService.submitVisit(usv.visit)
            .then(function(res){
                    userData.setUser();
                    usv.userStoreVisited = true;
                  },
                  function(res){
                    console.log(res);
                  });
      }
      function deleteVisit(){
        userVisitService.deleteVisit(usv.visit)
            .then(function(res){
              
              userData.setUser();
              usv.userStoreVisited = false;
             
            },
              function(res)
              {
                console.log(res);
              });
      }
      
      function activate(){
       
       usv.visit.userId = userData.getUser()._id;
        if($stateParams.storeId){
        usv.entity = $stateParams.storeId;
        usv.visit.storeId = $stateParams.storeId;
        usv.getVisitParamObj.storeId = $stateParams.storeId;
        
      }
      else if($stateParams.productId){
        usv.entity = $stateParams.productId;
        usv.visit.productId = $stateParams.productId;
        usv.getVisitParamObj.productId = $stateParams.productId;
      }
      if($auth.isAuthenticated()){
        userVisitService.getVisit(usv.visit)
            .then(function(res){
              
              
              if(res.data[0]){
              if(res.data[0]._id){
              
                usv.userStoreVisited = true;
              }}
              
             
            },
              function(res)
              {
                console.log(res);
              });
      }
      }

    }

})(window.angular);
