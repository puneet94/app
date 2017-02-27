(function(angular){
  'use strict';

angular.module('app.product')
  .service('getProductsService',["$http","storeData","baseUrlService",'changeBrowserURL',GetProductsService]);

/*
  * This servic has a function to get collection of stores`
*/
function GetProductsService($http,storeData,baseUrlService,changeBrowserURL){
  this.getStoreProductsList = getStoreProductsList;
  this.getSingleProduct = getSingleProduct;
this.getSingleProductPage = getSingleProductPage;
this.getSingleProductStores = getSingleProductStores;
  function getStoreProductsList(storeId){
  	var pageNo = 1;
  	return $http.get(baseUrlService.baseUrl+'product/products/store/'+storeId+"/"+pageNo);
    //return $http.get(baseUrlService.baseUrl+url,{params:paramData});

  }
  function getSingleProduct(productId){
  	return $http.get(baseUrlService.baseUrl+'product/products/singleProduct/'+productId);
    //return $http.get(baseUrlService.baseUrl+url,{params:paramData});

  }
  function getSingleProductStores(params){
    return $http.get(baseUrlService.baseUrl+'product/collection',{params:params});
    //return $http.get(baseUrlService.baseUrl+url,{params:paramData});

  }
  function getSingleProductPage(product,scrollId){
        var url = "product/singleProduct/"+product._id+"/"+(product.myslug || ' ');
        if(scrollId){
          //url = url + "?scrollId="+scrollId;
          changeBrowserURL.changeBrowserURLMethod(url,scrollId);
        }
        changeBrowserURL.changeBrowserURLMethod(url);
      }
}
})(window.angular);
