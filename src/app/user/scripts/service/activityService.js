(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.user')
  .service('activityService',["$http","baseUrlService",ActivityService]);

/*
  * This servic has a function names getStore which takes id as parameter and returns a promise
*/
function ActivityService($http,baseUrlService){
  this.getSingleUserActivity = getSingleUserActivity;
  this.getAllActivity = getAllActivity;
  this.getUserFollowingActivity = getUserFollowingActivity;
  function getSingleUserActivity(id){
    return $http.get(baseUrlService.baseUrl+'activity/singleUserActivity/'+id);
  }
  function getAllActivity(params){
    return $http.get(baseUrlService.baseUrl+'activity/allActivity/',{params:params});
  }
  function getUserFollowingActivity(userId,params){
    return $http.get(baseUrlService.baseUrl+'activity/userFollowingActivity/'+userId,{params:params});
  }



}
})(window.angular);
