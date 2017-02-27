(function(angular){
    'use strict';
angular.module('app.admin', []).config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.
        state('adminCreateStore', {
            url: '/admin/createStore',
            templateUrl: 'app/admin/views/adminCreateStore.html',
            controller: 'CreateStoreController',
            controllerAs: 'csc',
            resolve: {
                redirectIfNotAuthenticated2: ['$q', '$timeout', '$auth', 'changeBrowserURL',redirectIfNotAuthenticated2]
            }
        }).state('adminStorePage', {
            url: '/admin/adminStorePage/:storeId',
            templateUrl: 'app/admin/views/adminStorePage.html',
            controller: 'AdminStoreController',
            controllerAs: 'asc',
            resolve: {
                redirectIfNotAuthenticated2: ['$q', '$timeout', '$auth', 'changeBrowserURL',redirectIfNotAuthenticated2],
                redirectIfNotStoreAuthenticated: ['$q', '$stateParams', 'userData', 'adminStoreService', 'changeBrowserURL',redirectIfNotStoreAuthenticated]
            }
        }).state('adminCreateOffer', {
            url: '/admin/adminCreateOffer/:storeId',
            templateUrl: 'app/admin/views/adminCreateOffer.html',
            resolve: {
                redirectIfNotAuthenticated2: ['$q', '$timeout', '$auth', 'changeBrowserURL',redirectIfNotAuthenticated2],
                redirectIfNotStoreAuthenticated: ['$q', '$stateParams', 'userData', 'adminStoreService', 'changeBrowserURL',redirectIfNotStoreAuthenticated]
            }
        }).state('adminEditOffer', {
            url: '/admin/adminEditOffer/:storeId/:offerId',
            templateUrl: 'app/admin/views/adminEditOffer.html',
            resolve: {
                redirectIfNotAuthenticated2: ['$q', '$timeout', '$auth', 'changeBrowserURL',redirectIfNotAuthenticated2],
                redirectIfNotStoreAuthenticated: ['$q', '$stateParams', 'userData', 'adminStoreService', 'changeBrowserURL',redirectIfNotStoreAuthenticated]
            }
        }).state('adminCreateEvent', {
            url: '/admin/adminCreateEvent/:storeId',
            templateUrl: 'app/admin/views/adminCreateEvent.html',
            resolve: {
                redirectIfNotAuthenticated2: ['$q', '$timeout', '$auth', 'changeBrowserURL',redirectIfNotAuthenticated2],
                redirectIfNotStoreAuthenticated: ['$q', '$stateParams', 'userData', 'adminStoreService', 'changeBrowserURL',redirectIfNotStoreAuthenticated]
            }
        }).state('adminEditEvent', {
            url: '/admin/adminEditEvent/:storeId/:eventId',
            templateUrl: 'app/admin/views/adminEditEvent.html',
            resolve: {
                redirectIfNotAuthenticated2: ['$q', '$timeout', '$auth', 'changeBrowserURL',redirectIfNotAuthenticated2],
                redirectIfNotStoreAuthenticated: ['$q', '$stateParams', 'userData', 'adminStoreService', 'changeBrowserURL',redirectIfNotStoreAuthenticated]
            }
        });
    }
]);


function redirectIfNotAuthenticated2($q, $timeout, $auth, changeBrowserURL) {

    var defer = $q.defer();
    if ($auth.isAuthenticated()) {
        defer.resolve();
    } else {
        $timeout(function() {
            changeBrowserURL.changeBrowserURLMethod('/'); 
        });
        defer.reject();
    }
       
        
    return defer.promise;
}

function redirectIfNotStoreAuthenticated($q, $stateParams, userData, adminStoreService, changeBrowserURL) {
    
    var defer = $q.defer();
    
    adminStoreService.getStore($stateParams.storeId, { 'select': 'admin' }).then(function(response) {
        
        if (userData.getUser()._id == response.data.admin) {
            
            defer.resolve();

        } else {
            defer.reject();
            changeBrowserURL.changeBrowserURLMethod('/home');
        }
    }, function(response) {
        console.log(response);
    });

    return defer.promise;
}


})(window.angular);
