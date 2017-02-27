(function(angular) {
    'use strict';
    angular.module('app.user')

    .controller('UserMobileFeedController', ["$scope", "$auth",  UserMobileFeedController]);

    function UserMobileFeedController($scope, $auth) {

        var umfc = this;
        umfc.loading = true;
        umfc.authCheck = $auth.isAuthenticated();
        activate();

        umfc.tab = 1;

        umfc.setTab = function(newTab) {
            umfc.tab = newTab;
            console.log("the tab");
            console.log(umfc.tab);
        };

        umfc.isSet = function(tabNum) {
            return umfc.tab === tabNum;
        };

        function activate() {
            
        }


    }

})(window.angular);
