(function(angular) {
    'use strict';

    angular.module('app.home')
        .controller("AuthController", ["$scope",  "$auth",   'userAuthService', '$window','userData',AuthController]);

    function AuthController($scope, $auth,  userAuthService,$window,userData) {
        var phc = this;
        
        phc.authenticate = authenticate;
        phc.authLogout = authLogout;
        
        phc.showAuthenticationDialog = showAuthenticationDialog;
        phc.isAuth = $auth.isAuthenticated();

        function showAuthenticationDialog(ev) {
            userAuthService.showAuthenticationDialog(ev);
        }
        
        function authLogout() {
            $auth.logout();
            userData.removeUser();
            $window.location.reload();
        }

        function authenticate(provider) {
            userAuthService.socialAuthenticate(provider);
        }


    }


})(window.angular);
