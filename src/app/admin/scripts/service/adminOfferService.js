(function(angular){
  'use strict';

angular.module('app.offer')
  .service('adminOfferService',["$http","baseUrlService",'changeBrowserURL',AdminOfferService]);

/*
  * This servic has a function to get collection of offers`
*/

function AdminOfferService($http,baseUrlService){
  
  this.createOffer = createOffer;
  this.getOffer = getOffer;
  this.updateOffer = updateOffer;
  this.deleteOffer  = deleteOffer;
  
  function createOffer(storeId, offer){

  	return $http.post(baseUrlService.baseUrl+'admin/offers/'+storeId,offer);
    //return $http.get(baseUrlService.baseUrl+url,{params:paramData});

  }
  function updateOffer(offerId,storeId,offer){
  	return $http.put(baseUrlService.baseUrl+'admin/offer/'+storeId+'/'+offerId,offer);
  }
  function getOffer(offerId,storeId,obj){
    return $http.get(baseUrlService.baseUrl+'admin/offer/'+storeId+'/'+offerId,{params:obj});       
  }
  function deleteOffer(){

  }
}
})(window.angular);
