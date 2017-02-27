(function(angular) {
    'use strict';

    angular.module('app.home')
        .controller('UserChatNotificationController', ['userData', 'Socket', UserChatNotificationController]);

    function UserChatNotificationController(userData, Socket) {
        var ucn = this;
        var originatorEv;
        Socket.on("connect", function() {

             Socket.emit('addToSingleRoom', { 'roomId': userData.getUser()._id });
                });
        Socket.on('newMessageReceived', function(message) {

            if (message.user._id == userData.getUser()._id) {

            } else {
                ucn.messageReceived = true;
            }
        });
        ucn.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
            ucn.messageReceived = false;
        };
    }
})(window.angular);
