(function(angular) {
    'use strict';
    angular.module('app.chat', []).config(['$stateProvider',
        function($stateProvider) {
            $stateProvider.
            state('tabs.chatBox', {
                url: '/chatBox/:creator1/:creator2',
                views: {
                    'chatRooms-tab': {

                        templateUrl: 'app/chat/views/chatBox.html',
                        controller: 'ChatBoxController',
                        controllerAs: 'cbc',
                        resolve: {
                            redirectIfNotAuthenticated: ['$q', '$auth', '$stateParams', 'userData', 'changeBrowserURL', redirectIfNotAuthenticated]
                        }
                    }
                }


            }).state('tabs.chatRooms', {
                url: '/chatRoomsTab',
                views: {
                    'chatRooms-tab': {

                        templateUrl: 'app/chat/views/chatRoomList.html',
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

    function redirectIfNotAuthenticated($q, $auth, $stateParams, userData, changeBrowserURL) {
        var defer = $q.defer();
        var creator1 = $stateParams.creator1;
        var creator2 = $stateParams.creator2;
        if ($auth.isAuthenticated()) {
            if (creator2 == creator1) {
                defer.reject();
                changeBrowserURL.changeBrowserURLMethod('/home');
            } else if (userData.getUser()._id == creator1 || userData.getUser()._id == creator2) {

                defer.resolve();
            } else {
                defer.reject();
                changeBrowserURL.changeBrowserURLMethod('/home');
            }
        } else {
            defer.reject();
            changeBrowserURL.changeBrowserURLMethod('/home');
        }
        return defer.promise;
    }



})(window.angular);
