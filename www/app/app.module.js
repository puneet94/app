(function(angular) {

	'use strict';

	var app = angular.module('myApp', ['ui.router','ionic' ,'ngMessages', 'ngSanitize', 'afkl.lazyImage', 'satellizer', 'ngFileUpload', 'ngMap', 'btford.socket-io', '720kb.socialshare',
		'authModApp',
		'app.common', 'app.home', 'app.store', 'app.chat', 'app.admin', 'ngMaterial', 'app.review', 'app.product', 'app.user', 'app.offer', 'app.event'
	]);
	app.config(['$urlRouterProvider','$stateProvider', '$ionicConfigProvider',
		function($urlRouterProvider,$stateProvider, $ionicConfigProvider) {
			/*$mdThemingProvider.theme('default')
				.primaryPalette('cyan')
				.accentPalette('yellow')
				.warnPalette('orange');*/
			//.backgroundPalette('blue-grey');
			$ionicConfigProvider.tabs.position("bottom");
			$urlRouterProvider.otherwise('/tab/tabsHome');
		}
	]);
	app.run(['$rootScope', '$location', '$state', '$timeout', '$ionicPlatform',function($rootScope, $location, $state, $timeout,$ionicPlatform) {
		 $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
		$rootScope.config = {};
		$rootScope.config.app_url = $location.url();
		$rootScope.config.app_path = $location.path();
		$rootScope.layout = {};
		$rootScope.layout.loading = false;

		$rootScope.$on('$stateChangeStart', function() {
			
			
			$timeout(function() {
				$rootScope.layout.loading = true;
			});
		});
		$rootScope.$on('$stateChangeSuccess', function() {

			//hide loading gif
			$timeout(function() {
				$rootScope.layout.loading = false;
			}, 1000);
		});
		$rootScope.$on('$stateChangeError', function() {

			//hide loading gif
			alert('you are not authorized to view this page');
			$rootScope.layout.loading = false;

		});
	}]);
})(window.angular);
// red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green,,
//light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey
// .config(function($mdThemingProvider) {
//   $mdThemingProvider.theme('default')
//     .primaryPalette('pink')
//     .accentPalette('orange');
// });//"angular-material": "master","ng-directive-lazy-image": "afkl-lazy-image#^0.3.1"
