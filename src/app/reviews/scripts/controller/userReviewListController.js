(function(angular){
  'use strict';
angular.module('app.review')

  .controller('UserReviewListController',["$scope","$auth",'reviewService','userData','getSingleStore','getProductsService',UserReviewListController]);
  function UserReviewListController($scope,$auth,reviewService,userData,getSingleStore,getProductsService){
    var url = this;
    url.activate = activate;
    url.smallLoadingModel = {};
    url.getUserReviews = getUserReviews;
    url.getRating = getRating;
    url.userReviewUpvoted = userReviewUpvoted;
    url.authCheck = $auth.isAuthenticated();
    url.submitUserReviewUpvote = submitUserReviewUpvote;
    url.deleteUserReviewUpvote = deleteUserReviewUpvote;
    url.getUserPage = userData.getUserPage;
    url.getSingleStorePage = getSingleStore.getSingleStorePage;
    url.getSingleProductPage = getProductsService.getSingleProductPage;


    url.reviewParams = {};
    url.reviewParams.getRating = getRating;
    url.reviewParams.userReviewUpvoted = userReviewUpvoted;
    url.reviewParams.submitUserReviewUpvote = submitUserReviewUpvote;
    url.reviewParams.deleteUserReviewUpvote = deleteUserReviewUpvote;
    url.reviewParams.smallLoadingModel = url.smallLoadingModel;
    url.reviewParams.getRating = getRating;
    
    if(url.authCheck){
      url.userUpvotes  = userData.getUser().upvotes;
    }
    url.submitUserReviewUpvote = submitUserReviewUpvote;
    url.activate();
    function activate(){
      url.getUserReviews();
    }
    function getUserPage(userId){
      var url = "/user/"+userId;
      changeBrowserURL.changeBrowserURLMethod(url);
    }
    function getUserReviews(){
      reviewService.getUserReviews().then(function(res){
        url.reviewList = res.data;
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
        if(url.userUpvotes.indexOf(upArr[i])!=-1){

          url.currentUpvoteId = upArr[i];

          return true;
        }
      }


      //return false;
    }

    function submitUserReviewUpvote(review){
      url.smallLoadingModel[review._id] = true;

      reviewService.submitUserReviewUpvote({"reviewId":review._id,"userId":userData.getUser()._id})
      .then(function(res){
        review.upvotes.push(res.data.id);
        url.userUpvotes.push(res.data.id);userData.setUser();
        url.smallLoadingModel[review._id] = false;


      });
    }
    function deleteUserReviewUpvote(review){
      url.smallLoadingModel[review._id] = true;
      reviewService.deleteUserReviewUpvote({"reviewId":review._id,"userId":userData.getUser()._id})
      .then(function(res){
        review.upvotes.splice(review.upvotes.indexOf(res.data.id), 1);userData.setUser();
        url.smallLoadingModel[review._id] = false;
      });

    }

  }
})(window.angular);
