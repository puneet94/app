(function(angular){
  'use strict';
angular.module('app.user')

  .controller('UserPageSuggestionController',["$scope","userService",UserPageSuggestionController]);
  function UserPageSuggestionController($scope,userService){
    var upc = this;
    activate();
    
    upc.loading = true;
    $scope.$watch(function(){
      return upc.userSuggestionsModel;
    },function(value){
      if(value && value.length>=2){
        getUsers({'userSearch':value,'limit':20,'page':1});
      }
      else{
       getUsers({'limit':20,'page':1}); 
      }
    });
    
    function activate(){
      
      
    }
    function getUsers(params){
      userService.getUsers(params)
    .then(function(res){
        upc.usersList = res.data.docs;
        console.log("the users list");
        console.log(upc.usersList);
        upc.loading = false;
        
      });
    }


    }

})(window.angular);
