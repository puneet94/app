(function(angular){
  'use strict';
angular.module('app.review')

  .controller('StoreReviewListController',["$scope","$auth","$stateParams",'$state','reviewService','userData',StoreReviewListController]);
  function StoreReviewListController($scope,$auth,$stateParams,$state,reviewService,userData){
    var slc = this;
    slc.activate = activate;
    slc.smallLoadingModel = {};
    slc.getStoreReviews = getStoreReviews;
    slc.getRating = getRating;
    slc.userReviewUpvoted = userReviewUpvoted;
    slc.authCheck = $auth.isAuthenticated();
    slc.submitUserReviewUpvote = submitUserReviewUpvote;
    slc.deleteUserReviewUpvote = deleteUserReviewUpvote;
    slc.getUserPage = userData.getUserPage;

    //parameter for review directive
    slc.reviewParams = {};
    slc.reviewParams.getRating = getRating;
    slc.reviewParams.userReviewUpvoted = userReviewUpvoted;
    slc.reviewParams.submitUserReviewUpvote = submitUserReviewUpvote;
    slc.reviewParams.deleteUserReviewUpvote = deleteUserReviewUpvote;
    slc.reviewParams.smallLoadingModel = slc.smallLoadingModel;
    slc.reviewParams.getRating = getRating;

    
    if(slc.authCheck){
      slc.userUpvotes  = userData.getUser().upvotes;
    }
    
    slc.activate();
    function activate(){
      slc.getStoreReviews();
    }
    function getStoreReviews(){
      reviewService.getStoreReviews().then(function(res){
        slc.reviewList = res.data;
        
      },function(res){

      });
    }
    function getRating(review){

      var rating2 = parseInt(review.rating);
      var x = [];
      for(var i=0;i<rating2;i++){
        x.push(i);
      }

      return x;
    }

    function userReviewUpvoted(locReview){
      var upArr = locReview.upvotes;
      for(var i=0;i<upArr.length;i++){
        if(slc.userUpvotes.indexOf(upArr[i])!=-1){
          
          slc.currentUpvoteId = upArr[i];
          
          return true;
        }
      }
      
      
      //return false;
    }

    function submitUserReviewUpvote(review){
      slc.smallLoadingModel[review._id] = true;
      
      reviewService.submitUserReviewUpvote({"reviewId":review._id,"storeId":$stateParams.storeId,"userId":userData.getUser()._id})
      .then(function(res){
        review.upvotes.push(res.data.id);
        slc.userUpvotes.push(res.data.id);
        userData.setUser();
        slc.smallLoadingModel[review._id] = false;
        
        
      });
    }
    function deleteUserReviewUpvote(review){
      slc.smallLoadingModel[review._id] = true;
      reviewService.deleteUserReviewUpvote({"reviewId":review._id,"storeId":$stateParams.storeId,"userId":userData.getUser()._id})
      .then(function(res){
        review.upvotes.splice(review.upvotes.indexOf(res.data.id), 1);
        userData.setUser();
        slc.smallLoadingModel[review._id] = false;
      });

    }

  }
})(window.angular);
