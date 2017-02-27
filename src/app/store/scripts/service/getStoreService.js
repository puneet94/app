(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.store')
  .service('getSingleStore',["$http","storeData","baseUrlService","changeBrowserURL",GetSingleStoreWithId]);

/*
  * This servic has a function names getStore which takes id as parameter and returns a promise
*/
function GetSingleStoreWithId($http,storeData,baseUrlService,changeBrowserURL){
  this.getStore = getStore;
  this.getStoreRating = getStoreRating;
  this.getSingleStorePage = getSingleStorePage;
  function getStore(id){
    var params = {
      'page': '1',
      'limit':'10',
      obj:{
        'x':'y'
      }
    };
    $http.get(baseUrlService.baseUrl+'search/collections',{params:params}).then(function(res){
      console.log("testing basis");
      console.log(res);
    });
    return $http.get(baseUrlService.baseUrl+"store/singleStore/"+id);
    
  }
  function getStoreRating(id){
  	return $http.get(baseUrlService.baseUrl+"review/ratings/store/"+id);
  }
  function getSingleStorePage(store,scrollId){
        var url = "store/singleStore/"+store._id+"/"+(store.myslug || ' ');
        if(scrollId){
          //url = url + "?scrollId="+scrollId;
          changeBrowserURL.changeBrowserURLMethod(url,scrollId);
        }
        changeBrowserURL.changeBrowserURLMethod(url);
      }

}
})(window.angular);
