(function(angular){
  'use strict';

angular.module('app.admin')
  .service('adminProductService',["$http","baseUrlService",'changeBrowserURL',AdminProductService]);

/*
  * This servic has a function to get collection of products`
*/

function AdminProductService($http,baseUrlService,changeBrowserURL){
  this.checkProductAdmin = checkProductAdmin;
  this.createProduct = createProduct;
  this.getProduct = getProduct;
  this.updateProduct = updateProduct;
  this.deleteProduct  = deleteProduct;
  function checkProductAdmin(userId,productId){
    return $http.get(baseUrlService.baseUrl);
  }
  function createProduct(product,storeId){
  	return $http.post(baseUrlService.baseUrl+'admin/products/'+storeId,product);
    //return $http.get(baseUrlService.baseUrl+url,{params:paramData});

  }
  function updateProduct(storeId,productId,product){
    console.log("entered product update");
    console.log(product);
  	return $http.put(baseUrlService.baseUrl+'admin/product/'+productId+'/'+storeId,product);
  }
  function getProduct(productId,obj){
    return $http.get(baseUrlService.baseUrl+'admin/product/'+productId,{params:obj});       
  }
  function deleteProduct(){

  }
}
})(window.angular);
