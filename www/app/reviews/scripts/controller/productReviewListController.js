(function(angular){
  'use strict';
angular.module('app.review')

  .controller('ProductReviewListController',["$scope","$auth","$stateParams",'$state','changeBrowserURL','reviewService','userData',ProductReviewListController]);
  function ProductReviewListController($scope,$auth,$stateParams,$state,changeBrowserURL,reviewService,userData){
    var plc = this;
    plc.activate = activate;
    plc.smallLoadingModel = {};
    plc.getProductReviews = getProductReviews;
    plc.getRating = getRating;
    plc.userReviewUpvoted = userReviewUpvoted;
    plc.authCheck = $auth.isAuthenticated();
    plc.submitUserReviewUpvote = submitUserReviewUpvote;
    plc.deleteUserReviewUpvote = deleteUserReviewUpvote;
    plc.getUserPage = userData.getUserPage;

    plc.reviewParams = {};
    plc.reviewParams.getRating = getRating;
    plc.reviewParams.userReviewUpvoted = userReviewUpvoted;
    plc.reviewParams.submitUserReviewUpvote = submitUserReviewUpvote;
    plc.reviewParams.deleteUserReviewUpvote = deleteUserReviewUpvote;
    plc.reviewParams.smallLoadingModel = plc.smallLoadingModel;
    plc.reviewParams.getRating = getRating;

    if(plc.authCheck){
      plc.userUpvotes  = userData.getUser().upvotes;
    }
    plc.submitUserReviewUpvote = submitUserReviewUpvote;
    plc.activate();
    function activate(){
      plc.getProductReviews();
    }
    function getUserPage(userId){
      var url = "/user/"+userId;
      changeBrowserURL.changeBrowserURLMethod(url);
    }
    function getProductReviews(){
      reviewService.getProductReviews().then(function(res){
        plc.reviewList = res.data;

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
        if(plc.userUpvotes.indexOf(upArr[i])!=-1){

          plc.currentUpvoteId = upArr[i];

          return true;
        }
      }


      //return false;
    }

    function submitUserReviewUpvote(review){
      plc.smallLoadingModel[review._id] = true;

      reviewService.submitUserReviewUpvote({"reviewId":review._id,"productId":$stateParams.productId,"userId":userData.getUser()._id})
      .then(function(res){
        review.upvotes.push(res.data.id);
        plc.userUpvotes.push(res.data.id);userData.setUser();
        plc.smallLoadingModel[review._id] = false;


      });
    }
    function deleteUserReviewUpvote(review){
      plc.smallLoadingModel[review._id] = true;
      reviewService.deleteUserReviewUpvote({"reviewId":review._id,"productId":$stateParams.productId,"userId":userData.getUser()._id})
      .then(function(res){
        review.upvotes.splice(review.upvotes.indexOf(res.data.id), 1);userData.setUser();
        plc.smallLoadingModel[review._id] = false;
      });

    }

  }
})(window.angular);
