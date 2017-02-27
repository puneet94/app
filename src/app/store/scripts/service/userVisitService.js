(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.store')
  .service('userVisitService',["$http","baseUrlService",UserVisitService]);

/*
  * This servic has a function names getStore which takes id as parameter and returns a promise
*/
function UserVisitService($http,baseUrlService){
  this.submitVisit = submitVisit;
  this.deleteVisit = deleteVisit;
  this.getVisit = getVisit;

  function getVisit(visitData){
    return $http.get(baseUrlService.baseUrl+"visit/visited",{"params":visitData});
  }

  function submitVisit(visitData){
    return $http.post(baseUrlService.baseUrl+"visit/visits/store",visitData);
  }
  function deleteVisit(visitObj){
    return $http.delete(baseUrlService.baseUrl+"visit/visits/",{"params":visitObj});
  }
}
})(window.angular);
