(function(angular) {
    'use strict';
    angular
        .module('authModApp', [])
        .config(["$stateProvider", "$httpProvider", "$authProvider", authConfig]);

    function authConfig($stateProvider, $httpProvider, $authProvider) {
        //shopuae
        //var fbClientId = '991629147629579';
        //shoppins
        var fbClientId = '1068203956594250';
        console.log("the state provider");
        console.log(window.location.origin);

        var authenticateUrl = 'http://www.ofline.in'+'/authenticate';
        $stateProvider
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/authentication/views/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'rcl',
                resolve: {
                    redirectIfNotAuthenticated: ['$q', '$auth', '$state', 'userData', 'changeBrowserURL',redirectIfNotAuthenticated]
                }
            })
            .state('logout', {
                url: '/logout',
                controller: 'LogoutCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/authentication/views/login.html',
                controller: 'LoginController',
                controllerAs: 'login',
                resolve: {
                    redirectIfNotAuthenticated: ['$q', '$auth', '$state', 'userData', 'changeBrowserURL',redirectIfNotAuthenticated]
                }


            });
        $authProvider.loginUrl = authenticateUrl + "/login";
        $authProvider.signupUrl = authenticateUrl + "/signup";

        $authProvider.facebook({
            clientId: fbClientId,
            url: authenticateUrl + '/auth/facebook',
            redirectUri: 'http://www.ofline.in/'
        });
    }

    function redirectIfNotAuthenticated($q, $auth, $state, userData, changeBrowserURL) {
        var defer = $q.defer();
        if ($auth.isAuthenticated()) {
            defer.reject();
            changeBrowserURL.changeBrowserURLMethod('/home');
        } else {
            defer.resolve();
        }
        return defer.promise;
    }
})(window.angular);
