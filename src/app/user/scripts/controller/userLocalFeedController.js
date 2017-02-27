(function(angular) {
    'use strict';
    angular.module('app.user')

    .controller('UserLocalFeedController', ["$scope", "$auth", "activityService", UserLocalFeedController]);

    function UserLocalFeedController($scope, $auth, activityService) {
        
    var ual = this;
    ual.loading = true;
    ual.activityData = [];
    ual.params = {
      'page': 1,
      'limit': 25
    };
    ual.loadMoreFeed = loadMoreFeed;
    ual.getAllActivity = getAllActivity;
    ual.getActivity = getActivity;

    activate();

    function loadMoreFeed() {
      ual.params.page+=1;
      ual.getActivity(ual.params);
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
        ual.getAllActivity(params);
      
    }

    function activate() {

      ual.getActivity(ual.params);

    }

    }

})(window.angular);
