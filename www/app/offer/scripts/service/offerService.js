(function(angular){
  'use strict';

angular.module('app.offer')
  .service('offerService',["$http","baseUrlService",OfferService]);

/*
  * This servic has a function to get collection of offers`
*/
function OfferService($http,baseUrlService){
  this.getOfferCollection = getOfferCollection;
  this.getSingleOffer = getSingleOffer;
  function getOfferCollection(params){
  	console.log(params);
    return $http.get(baseUrlService.baseUrl+'offer/collection',{params:params});

  }
  function getSingleOffer(id,params){
	return $http.get(baseUrlService.baseUrl+'offer/offer/'+id,{params:params});  	
  }
}
})(window.angular);
