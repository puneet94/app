(function(angular) {
    'use strict';
    angular.module('app.user')

    .controller('UserCustomFeedController', ["$scope", "$auth", "activityService", UserCustomFeedController]);

    function UserCustomFeedController($scope, $auth, activityService) {
        
    var ual = this;
    ual.loading = true;
    ual.authCheck = $auth.isAuthenticated();
    ual.activityData = [];
    ual.params = {
      'page': 1,
      'limit': 25
    };
    ual.loadMoreFeed = loadMoreFeed;
    ual.getUserFollowingActivity = getUserFollowingActivity;
    ual.getAllActivity = getAllActivity;
    ual.getActivity = getActivity;

    activate();

    function loadMoreFeed() {
      ual.params.page+=1;
      ual.getActivity(ual.params);
    }

    function getUserFollowingActivity(params) {
      ual.loading = true;

      activityService.getUserFollowingActivity($auth.getPayload().sub, params).then(function(result) {
        ual.activityData.push(result.data);
        console.log("from the activity");
        console.log(result);
        ual.loading = false;
      });
    }

    function getAllActivity(params) {
      ual.loading = true;
      activityService.getAllActivity(params).then(function(result) {
        console.log("from the activity");
        console.log(result);
        ual.activityData.push(result.data);
        ual.loading = false;
      });
    }

    function getActivity(params) {
      if (ual.authCheck) {
        ual.getUserFollowingActivity(params);

      } else {
        ual.getAllActivity(params);
      }
    }

    function activate() {

      ual.getActivity(ual.params);

    }



    }

})(window.angular);
