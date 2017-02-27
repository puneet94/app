(function(angular){
  'use strict';
  angular.module('app.review')
      .controller('ReviewSubmitController',['$auth','$stateParams','$state','userData','reviewService',ReviewSubmitController]);
      function ReviewSubmitController($auth,$stateParams,$state,userData,reviewService){
        var rsv  = this;
        rsv.review = {};
        rsv.user = {};
        if($stateParams.storeId){
          rsv.review.storeId = $stateParams.storeId;  
        }
        else if($stateParams.productId){
          rsv.review.productId = $stateParams.productId;  
        }
        
        rsv.ratingClick = ratingClick;

        if(userData.getUser()){
          rsv.review.userId = userData.getUser()._id;
          rsv.user.picture = userData.getUser().picture;
          rsv.user.displayName = userData.getUser().displayName;
        }
        else{
          rsv.review.userId = $auth.getPayload().sub;
        }

        rsv.submitReview = submitReview;
        function ratingClick(obj){

          var rating = 6-obj.currentTarget.attributes.value.nodeValue;

          rsv.review.rating = rating;
        }
        function submitReview(){
          if($stateParams.storeId){
          reviewService.submitStoreReview(rsv.review)
            .then(function(res){
              userData.setUser();
              $state.reload();
            },function(res){

            }); 
        }
        else if($stateParams.productId){
          reviewService.submitProductReview(rsv.review)
            .then(function(res){
              userData.setUser();
              $state.reload();
            },function(res){

            });
        }
          
        }

      }
})(window.angular);
