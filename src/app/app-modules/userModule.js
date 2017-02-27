(function(angular) {
	'use strict';
	angular.module('app.user', []).config(['$stateProvider',
		function($stateProvider) {
			$stateProvider.
			state('tabs.userFeed', {
				url: '/userFeedTab',
				views: {
					'userFeed-tab': {
						templateUrl: 'app/user/views/userMobileFeed.html',
						controller: 'UserMobileFeedController',
						controllerAs: 'umfc'
					}
				}
			}).
			state('tabs.userPage', {
				url: '/user/:userId',
				views: {
					'userFeed-tab': {
						templateUrl: 'app/user/views/userProfilePage.html',
						controller: 'UserPageController',
						controllerAs: 'upc'
					}
				}

			}).
			state('tabs.userProfileSettings', {
				url: '/userProfileSettings',
				views: {
					'userFeed-tab': {
						templateUrl: 'app/user/views/userProfileSettingsPage.html',
						resolve: {
							redirectIfNotUserAuthenticated: ['$q', '$auth', 'changeBrowserURL', redirectIfNotUserAuthenticated]
						}
					}
				}

			}).
			state('tabs.userAccountSettings', {
				url: '/userAccountSettings',
				views: {
					'userFeed-tab': {
						templateUrl: 'app/user/views/userAccountSettingsPage.html',
						resolve: {
							redirectIfNotUserAuthenticated: ['$q', '$auth', 'changeBrowserURL', redirectIfNotUserAuthenticated]
						}
					}
				}

			}).
			state('tabs.userMePage', {
				url: '/userMePage',
				views: {
					'userFeed-tab': {
						templateUrl: 'app/user/views/userMePage.html',
						controller: 'UserMePageController',
						controllerAs: 'umpc',
						resolve: {
							redirectIfNotUserAuthenticated: ['$q', '$auth', 'changeBrowserURL', redirectIfNotUserAuthenticated]
						}
					}
				}

			});
		}
	]);



	function redirectIfNotUserAuthenticated($q, $auth, changeBrowserURL) {
		var defer = $q.defer();

		if ($auth.isAuthenticated()) {
			defer.resolve();

		} else {
			defer.reject();
			changeBrowserURL.changeBrowserURLMethod('/home');
		}
		return defer.promise;
	}

})(window.angular);
