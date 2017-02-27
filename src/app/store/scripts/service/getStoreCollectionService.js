(function(angular){
  'use strict';

angular.module('app.store')
  .service('getStoreCollectionService',["$http","storeData","baseUrlService",GetStoreCollectionService]);

/*
  * This servic has a function to get collection of stores`
*/
function GetStoreCollectionService($http,storeData,baseUrlService){
  this.getStoreCollection = getStoreCollection;
  this.storesCollection = storesCollection;
  this.categoryCollection = categoryCollection;

  function getStoreCollection(url,paramData){
    return $http.get(baseUrlService.baseUrl+url,{params:paramData});
  }

  function storesCollection(paramData){
  	return $http.get(baseUrlService.baseUrl+'store/collection',{params:paramData});
  }
  function categoryCollection(paramData){
  	
  	return $http.get(baseUrlService.baseUrl+'store/userSearch/storeCategories',{params:paramData});
  }
}
})(window.angular);
