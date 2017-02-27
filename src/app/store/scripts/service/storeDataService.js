(function(angular){
  'use strict';

angular.module('app.store')
  .factory('storeData',["$window",storeData]);

/*
  * This factory is used to get store details from window storage
*/
function storeData($window) {
  var storage = $window.localStorage;
  var obj1 = {
    setStore: function (store) {
        storage.setItem('store',JSON.stringify(store));
    },
    getStore: function(){
      return JSON.parse(storage.getItem('store'));
    },
    removeStore: function(){

      storage.removeItem('store');
    }
  };
    return obj1;
  }



})(window.angular);
