(function(angular) {
    'use strict';

    angular.module('app.home')
        .controller("AuthenticationModalController", ["$scope", "changeBrowserURL", 'userAuthService',"$auth", "$window", "$state", '$mdDialog', "userData",  AuthenticationModalController]);

    function AuthenticationModalController($scope, changeBrowserURL, userAuthService,$auth, $window, $state, $mdDialog, userData) {
        var phc = this;
        phc.toHomePage = toHomePage;
        phc.authenticate = authenticate;
        phc.authLogout = authLogout;
        phc.loginPage = loginPage;
        phc.socialAuthenticate = socialAuthenticate;
        phc.cancelDialog = cancelDialog;

      function cancelDialog() {
            $mdDialog.cancel();
        }
        function socialAuthenticate(provider) {
            console.log("entered auth");
            userAuthService.socialAuthenticate(provider);
            
        }
        phc.tab = 1;

        phc.setTab = function(newTab) {
            phc.tab = newTab;
        };

        phc.isSet = function(tabNum) {
            return phc.tab === tabNum;
        };

        phc.isAuth = $auth.isAuthenticated();

        function toHomePage() {
            changeBrowserURL.changeBrowserURLMethod('/');
        }


        function loginPage() {
            changeBrowserURL.changeBrowserURLMethod('/login');
        }

        function authenticate(provider) {
            $auth.authenticate(provider).then(function(response) {
                userData.setUser(response.data.user);
                alert('login with facebook successfull');
                $window.location.reload();
            });
        }

        function authLogout() {
            $auth.logout();
            userData.removeUser();
            toHomePage();
        }
    }


})(window.angular);