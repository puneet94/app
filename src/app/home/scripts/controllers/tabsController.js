(function(angular){
	'use strict';

	angular.module('app.home')
	.controller('TabsController',["$scope","$auth", 'userAuthService' ,TabsController]);

	function TabsController($scope,$auth,userAuthService){
			var phc = this;
			
			phc.isAuthenticated = $auth.isAuthenticated();
			
			phc.showAuthenticationDialog = showAuthenticationDialog;
        function showAuthenticationDialog(ev) {
            userAuthService.showAuthenticationDialog(ev);
        }
			
            
	    	
	}

})(window.angular);
