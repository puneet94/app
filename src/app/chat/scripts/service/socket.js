(function(angular){
'use strict';
angular.module('app.chat').factory('Socket', ['socketFactory','baseUrlService',SocketFactory]);
    
    function SocketFactory(socketFactory,baseUrlService) {
        return socketFactory({
            prefix: '',
            ioSocket: io.connect(baseUrlService.baseUrl)
        });
    }

})(window.angular);