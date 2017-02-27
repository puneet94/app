(function(angular){
  'use strict';

angular.module('authModApp')
  .service('userAuthService',["$http",'$auth',"baseUrlService",'$mdDialog','userData','$window',UserAuthService]);

/*
  * This servic has a function to get collection of stores`
*/
function UserAuthService($http,$auth,baseUrlService,$mdDialog,userData,$window){
  this.socialAuthenticate = socialAuthenticate;
  this.showAuthenticationDialog = showAuthenticationDialog;

  function showAuthenticationDialog(ev) {
            $mdDialog.show({
                    controller: 'AuthenticationModalController',
                    controllerAs: 'amc',
                    templateUrl: 'app/authentication/views/authenticationModalTemplate.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true // Only for -xs, -sm breakpoints.*/
                })
                .then(function(answer) {
                    
                }, function() {

                });
        }


        function socialAuthenticate(provider) {
        	
            $auth.authenticate(provider).then(function(response) {
                userData.setUser(response.data.user);
                alert('login with facebook successfull');
                $window.location.reload();
            });
        }
}
})(window.angular);
