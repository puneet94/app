(function(angular){
  'use strict';

angular.module('app.admin')
  .service('adminStoreService',["$http","baseUrlService",'changeBrowserURL',AdminStoreService]);

/*
  * This servic has a function to get collection of stores`
*/

function AdminStoreService($http,baseUrlService,changeBrowserURL){
  this.checkStoreAdmin = checkStoreAdmin;
  this.createStore = createStore;
  this.getStore = getStore;
  this.updateStore = updateStore;
  this.deleteStore  = deleteStore;
  function checkStoreAdmin(userId,storeId){
    return $http.get(baseUrlService.baseUrl);
  }
  function createStore(store){
  	return $http.post(baseUrlService.baseUrl+'admin/stores',store);
    //return $http.get(baseUrlService.baseUrl+url,{params:paramData});

  }
  function updateStore(storeId,store){
  	return $http.put(baseUrlService.baseUrl+'admin/store/'+storeId,store);
  }
  function getStore(storeId,obj){
    return $http.get(baseUrlService.baseUrl+'admin/store/'+storeId,{params:obj});       
  }
  function deleteStore(){

  }
}
})(window.angular);
