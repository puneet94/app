(function(angular){
  'use strict';

angular.module('app.event')
  .service('eventService',["$http","baseUrlService",EventService]);

/*
  * This servic has a function to get collection of events`
*/
function EventService($http,baseUrlService){
  this.getEventCollection = getEventCollection;
  this.getSingleEvent = getSingleEvent;
  function getEventCollection(params){
  	console.log(params);
    return $http.get(baseUrlService.baseUrl+'event/collection',{params:params});

  }
  function getSingleEvent(id,params){
	return $http.get(baseUrlService.baseUrl+'event/event/'+id,{params:params});  	
  }
}
})(window.angular);
