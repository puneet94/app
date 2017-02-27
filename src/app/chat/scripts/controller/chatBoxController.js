(function(angular) {
    'use strict';
    angular.module('app.chat')

    .controller('ChatBoxController', ['$scope', 'Socket', '$stateParams', 'userData', 'chatService', 'userService',ChatBoxController]);

    function ChatBoxController($scope, Socket, $stateParams, userData, chatService,userService) {
        var cbc = this;
        
        cbc.currentUser = userData.getUser()._id;
        cbc.receiverUser = '';
        cbc.innerLoading = true;
        cbc.chatRoomId = '';
        cbc.messageLoading = false;
        activate();
        
        function getChatMessages(){
          chatService.getChatMessages(cbc.chatRoomId).then(function(res){
              cbc.chatList = res.data[0].chats;
               $('.chatBoxUL').animate({ scrollTop: 99999999 }, 'slow');
               cbc.innerLoading = false;
            },function(res){
              console.log(res);
            });

        }
        function activate() {
            
            chatService.getChatRoom().then(function(res) {
                console.log("the response the room");
                console.log(res);
                cbc.chatRoomId = res.data._id;
                cbc.receiverUserId = res.data.creator1 == cbc.currentUser ? res.data.creator2: res.data.creator1;
                console.log("the reciver id"+cbc.receiverUserId);
                socketJoin();
                getChatMessages();

                userService.getUserDetails(cbc.receiverUserId,{'fields':'displayName firstName'}).then(function(response){
                  console.log("the receiver");
                  console.log(response.data);
                  cbc.receiverUser = response.data.displayName || (response.data.firstName);
                });
            }, function(res) {
                console.log(res);
            });
        }
        

        function socketJoin() {
            Socket.emit('addToRoom', { 'roomId': cbc.chatRoomId });
            Socket.on('messageSaved',function(message){
                  cbc.chatList.push(message);
                  $('.chatBoxUL').animate({ scrollTop: 99999999 }, 'slow');
                });
        }
        cbc.sendMsg = function($event) {
            if ($event.which == 13 && !$event.shiftKey && cbc.myMsg) {
                cbc.messageLoading = true;
                var chatObj = { 'message': cbc.myMsg, 'user': cbc.currentUser, 'roomId': cbc.chatRoomId };
                chatService.sendChatMessage(chatObj).then(function(res){
                  cbc.myMsg = '';
                  cbc.messageLoading = false;
                },function(res){
                  console.log(res);
                });
                
            }
        };
        cbc.clickSubmit = function(){
          if (cbc.myMsg) {
                cbc.messageLoading = true;
                var chatObj = { 'message': cbc.myMsg, 'user': cbc.currentUser, 'roomId': cbc.chatRoomId };
                chatService.sendChatMessage(chatObj).then(function(res){
                  cbc.myMsg = '';
                  cbc.messageLoading = false;
                },function(res){
                  console.log(res);
                });
                
            }  
        };

    }
})(window.angular);
