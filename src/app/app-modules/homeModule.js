(function(angular) {
	'use strict';
	angular.module('app.home', [])
		.config(['$stateProvider', config]);

	function config($stateProvider) {
		$stateProvider.
		state('searchBoxPage', {
			url: '/searchBoxPage',
			templateUrl: 'app/home/views/searchBoxPage.html',
			controller: 'SearchBoxPageController',
			controllerAs: 'sbpc'
		}).
		state('citySearchPage', {
			url: '/citySearchPage',
			templateUrl: 'app/home/views/citySearchPage.html',
			controller: 'CitySearchPageController',
			controllerAs: 'cspc'
		}).
		state('entitySearchPage', {
				url: '/entitySearchPage',
				templateUrl: 'app/home/views/entitySearchPage.html',
				controller: 'EntitySearchPageController',
				controllerAs: 'espc'
			})
			.state('tabs', {
				url: "/tab",
				abstract: true,
				templateUrl: "app/home/views/tabs.html",
				controller: 'TabsController',
				controllerAs: 'tc'
			})
			.state('tabs.home', {
				url: "/tabsHome",
				cache: false,
				views: {
					'home-tab': {
						templateUrl: 'app/home/views/mobileHomePage.html',
						controller: 'HomeController',
						controllerAs: 'hm'
					}
				}
			})
			.state('tabs.mePage', {
				url: "/mePage",
				views: {
					'mePage-tab': {
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



//mongod --config C:\Program Files\MongoDB\mongo.config

//mongod.exe --storageEngine=mmapv1

//https://devdactic.com/restful-api-user-authentication-1/

//passport js angularjs
//https://github.com/DaftMonk/angular-passport
//https://www.google.co.in/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=passport%20js%20angularjs

//http://speakingaword.blogspot.in/2013/08/authentication-in-angularjs-nodejs-and.html
