(function(angular){
  'use strict';
angular.module('app.review')

  .directive('singleReviewDirective',['$auth',singleReviewDirective]);
  function singleReviewDirective($auth){    
    return {
      replace: true,
      scope:{
        
        reviewParams: "=reviewParams",
        review: "=review"
      },
      templateUrl: 'app/reviews/views/singleReviewTemplate.html',
      link: function($scope){
        $scope.authCheck = $auth.isAuthenticated();
      }
    };
  }
})(window.angular);
