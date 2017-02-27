(function(angular) {
    'use strict';

    angular.module('app.home')
        .controller('MobileFooterController', ["$scope", '$auth',"userAuthService", MobileFooterController]);

    function MobileFooterController($scope,$auth ,userAuthService) {
        var mfc = this;
        mfc.authCheck = $auth.isAuthenticated();
        mfc.showAuthenticationDialog = showAuthenticationDialog;
        function showAuthenticationDialog(ev) {
            userAuthService.showAuthenticationDialog(ev);
        }
    }

})(window.angular);
/*git clone https://github.com/mrvautin/adminMongo.git && cd adminMongo*/
