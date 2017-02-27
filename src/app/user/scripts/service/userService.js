(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.user')
  .service('userService',["$http","baseUrlService",'userData',UserService]);

/*
  * This servic has a function names getStore which takes id as parameter and returns a promise
*/
function UserService($http,baseUrlService,userData){
  this.getSingleUser = getSingleUser;
  this.getUserDetails = getUserDetails;
  this.getStoreRating = getStoreRating;
  this.submitUserFollow = submitUserFollow;
  this.submitStoreReport = submitStoreReport;
  this.deleteUserFollow = deleteUserFollow;
  this.checkUserFollow = checkUserFollow;
  this.getUserFollowers = getUserFollowers;
  this.getUserFollowing = getUserFollowing;
  this.getUserStores = getUserStores;
  this.updateUser = updateUser;
  this.checkUserPassword = checkUserPassword;
  this.changeUserPassword = changeUserPassword;
  this.getUsers = getUsers;

  function getUsers(params){
    return $http.get(baseUrlService.baseUrl+"user/collection",{params:params});

  }
  function getUserDetails(id,params){
    return $http.get(baseUrlService.baseUrl+"user/user/"+id,{params:params});

  }
  function getSingleUser(id){
    return $http.get(baseUrlService.baseUrl+"user/singleUser/"+id);

  }
  function getStoreRating(id){
  	return $http.get(baseUrlService.baseUrl+"review/ratings/store/"+id);
  }
  function submitStoreReport(report){

    return $http.post(baseUrlService.baseUrl+"user/submitStoreReport/",report);
  }
  function submitUserFollow(userId,followedId){

    return $http.post(baseUrlService.baseUrl+"user/submitFollow/"+userId+'/'+followedId);
  }
  function deleteUserFollow(userId,followedId){

    return $http.post(baseUrlService.baseUrl+"user/deleteFollow/"+userId+'/'+followedId);
  }
  function checkUserFollow(userId,followedId){
    
    return $http.get(baseUrlService.baseUrl+"user/checkFollow/"+userId+'/'+followedId);
  }
  function getUserFollowers(userId){
    return $http.get(baseUrlService.baseUrl+"user/userFollowers/"+userId);
  }
  function getUserFollowing(userId){
    return $http.get(baseUrlService.baseUrl+"user/userFollowing/"+userId);
  }
  function getUserStores(userId){
    return $http.get(baseUrlService.baseUrl+"user/singleUser/"+userId,{params: { 'select': 'name address.area address.locality' }});
  }
  function updateUser(user){
    console.log("the id"+userData.getUser()._id);
    return $http.post(baseUrlService.baseUrl+'user/updateUser/'+userData.getUser()._id,user);
  }
  function checkUserPassword(password){
   return $http.post(baseUrlService.baseUrl+'user/checkPassword/'+userData.getUser()._id,password); 
  }
  function changeUserPassword(password){
   return $http.post(baseUrlService.baseUrl+'user/changePassword/'+userData.getUser()._id,password); 
  }


}
})(window.angular);
