(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.store')
  .service('userUpvoteService',["$http","baseUrlService",UserUpvoteService]);

/*
  * This servic has a function names getStore which takes id as parameter and returns a promise
*/
function UserUpvoteService($http,baseUrlService){
  this.submitUpvote = submitUpvote;
  this.deleteUpvote = deleteUpvote;
  this.getUpvote = getUpvote;

  function getUpvote(upvoteData){
    return $http.get(baseUrlService.baseUrl+"upvote/upvoted",{"params":upvoteData});
  }

  function submitUpvote(upvoteData){
    return $http.post(baseUrlService.baseUrl+"upvote/upvotes/storeUpvote",upvoteData);
  }
  function deleteUpvote(upvoteId){
    return $http.delete(baseUrlService.baseUrl+"upvote/upvotes/"+upvoteId);//{"params":upvoteObj});
  }
}
})(window.angular);
