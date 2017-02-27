(function(angular){
'use strict';



angular.module('app.chat')
	.factory('SocketUserService', ['socketFactory','userData','baseUrlService',socketFactoryFunction]);
    function socketFactoryFunction(socketFactory,userData,baseUrlService) {
        return socketFactory({
            prefix: '',
            ioSocket: io.connect(baseUrlService.baseUrl+userData.getUser()._id)
        });
    }
})(window.angular);