(function(angular){
  'use strict';
angular.module('app.user')

  .controller('UserActivityListController',["$scope",'$stateParams',"activityService",UserActivityListController]);
  function UserActivityListController($scope,$stateParams,activityService){
    var ual = this;
    ual.loading = true;
    ual.activityData = ' ';
    activate();
    function activate(){

      ual.loading = true;
        activityService.getSingleUserActivity($stateParams.userId).then(function(result){        
        ual.activityData+= result.data;

        ual.loading = false;
      }); 
      
    }


    }

})(window.angular);
