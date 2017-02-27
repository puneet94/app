(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.store')
  .service('userFollowService',["$http","baseUrlService",UserFollowService]);

/*
  * This servic has a function names getStore which takes id as parameter and returns a promise
*/
function UserFollowService($http,baseUrlService){
  this.submitFollow = submitFollow;
  this.deleteFollow = deleteFollow;
  this.getFollow = getFollow;

  function getFollow(followData){
    return $http.get(baseUrlService.baseUrl+"follow/followed",{"params":followData});
  }

  function submitFollow(followData){
    return $http.post(baseUrlService.baseUrl+"store/submitStoreFollow",followData);
  }
  function deleteFollow(followObj){
    return $http.post(baseUrlService.baseUrl+"store/deleteStoreFollow",followObj);
  }
}
})(window.angular);
