(function(angular) {
    'use strict';
    angular.module('app.store')

    .controller('UserStoreReportController', ["$scope", "$auth", "$stateParams", "userData", "userService", '$mdDialog', UserStoreReportController]);

    function UserStoreReportController($scope, $auth, $stateParams, userData, userService, $mdDialog) {
        var usv = this;
        usv.report = {};

        usv.getReportParamObj = {};
        usv.showReportForm = true;
        usv.submitUserReport = submitUserReport;
        usv.getReportParamObj.userId = userData.getUser()._id;
        usv.report.userId = userData.getUser()._id;
        usv.report.storeId = $stateParams.storeId;
        usv.hideReportDialog = hideReportDialog;
        usv.reportDialogCancel = reportDialogCancel;

        function hideReportDialog() {
            $mdDialog.hide();
        }

        function reportDialogCancel() {
            $mdDialog.cancel();
        }

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };

        activate();

        function submitUserReport() {
            console.log(usv.report);
            usv.innerLoading = true;
            userService.submitStoreReport(usv.report)
                .then(function(res) {
                        usv.innerLoading = false;
						usv.showReportForm = false;
                    },
                    function(res) {
                        console.log(res);
                    });
        }


        function activate() {
            console.log("the auth");
            console.log($auth.getPayload().sub);

        }

    }

})(window.angular);
