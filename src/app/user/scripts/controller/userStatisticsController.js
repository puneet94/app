(function(angular){
  'use strict';
angular.module('app.user')

  .controller('UserStatisticsController',["$scope","$auth",'$location','$stateParams',"userData","userService",UserStatisticsController]);
  function UserStatisticsController($scope,$auth,$location,$stateParams,userData,userService){
    var upc = this;
    activate();
    function activate(){
      
    }


    }

})(window.angular);
