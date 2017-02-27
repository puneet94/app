(function(angular){
  'use strict';

angular.module('app.product')
  .service('getProductCollectionService',["$http","baseUrlService",GetProductCollectionService]);

/*
  * This servic has a function to get collection of products`
*/
function GetProductCollectionService($http,baseUrlService){
  this.getProductCollection = getProductCollection;
  this.getProductNameCollection = getProductNameCollection;
  this.productsCollection = productsCollection;
  function getProductCollection(url,paramData){
  	console.log(paramData);
    return $http.get(baseUrlService.baseUrl+url,{params:paramData});

  }
  function productsCollection(paramData){
    console.log(paramData);
    return $http.get(baseUrlService.baseUrl+'product/collection',{params:paramData});

  }
  function getProductNameCollection(){
	return $http.get(baseUrlService.baseUrl+'product/products/name/:name/:location/:pageNo',{params:paramData});  	
  }
}
})(window.angular);
