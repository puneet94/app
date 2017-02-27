(function(angular){
	'use strict';

	angular.module('app.home')
	.controller('HeaderController',["$scope","userData","changeBrowserURL","$auth","$mdDialog", "$mdMedia","$timeout", "$mdSidenav", HeaderController]);

	function HeaderController($scope,userData,changeBrowserURL,$auth,$mdDialog, $mdMedia,$timeout, $mdSidenav){
			var phc = this;
			phc.toHomePage = toHomePage;
			phc.authenticate = authenticate;
			phc.authLogout = authLogout;
			phc.showAdvanced = showAdvanced;
			phc.customFullscreen = undefined;
			phc.isAuth = $auth.isAuthenticated();
			
			phc.isOpenLeft = function(){
	      return $mdSidenav('left').isOpen();
	    };
	   phc.toggleLeft = buildToggler('left');

	  function buildToggler(navID) {
	      return function() {
	        // Component lookup should always be available since we are not using `ng-if`.
	        $mdSidenav(navID)
	          .toggle()
	          .then(function () {
	            console.log("toggle " + navID + " is done");
	          });
	      };
	    }
			function toHomePage(){
				changeBrowserURL.changeBrowserURLMethod('/');
			}
			function authenticate(provider) {
		    	$auth.authenticate(provider);
		    	toHomePage();
	    	}
	    	function authLogout(){
	    		$auth.logout();toHomePage();
	    	}
	    	function showAdvanced(ev) {
			    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
			    $mdDialog.show({
			      controller: 'ModalFormLoginController',
			      templateUrl: 'app/home/views/modalFormLogin.html',
			      parent: angular.element(document.body),
			      targetEvent: ev,
			      clickOutsideToClose:true,
			      fullscreen: phc.customFullscreen
			    })
			    .then(function(answer) {
			      $scope.status = 'You said the information was "' + answer + '".';
			    }, function() {
			      $scope.status = 'You cancelled the dialog.';
			    });
			    $scope.$watch(function() {

	      			return $mdMedia('md') || $mdMedia('xl');
	    		}, function(wantsFullScreen) {
		      		phc.customFullscreen = (wantsFullScreen === true);

	    		});

	  		}
	}

})(window.angular);
