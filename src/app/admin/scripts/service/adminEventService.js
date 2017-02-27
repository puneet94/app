(function(angular){
  'use strict';

angular.module('app.event')
  .service('adminEventService',["$http","baseUrlService",'changeBrowserURL',AdminEventService]);

/*
  * This servic has a function to get collection of events`
*/

function AdminEventService($http,baseUrlService){
  
  this.createEvent = createEvent;
  this.getEvent = getEvent;
  this.updateEvent = updateEvent;
  this.deleteEvent  = deleteEvent;
  
  function createEvent(storeId, event){

  	return $http.post(baseUrlService.baseUrl+'admin/events/'+storeId,event);
    //return $http.get(baseUrlService.baseUrl+url,{params:paramData});

  }
  function updateEvent(eventId,storeId,event){
  	return $http.put(baseUrlService.baseUrl+'admin/event/'+storeId+'/'+eventId,event);
  }
  function getEvent(eventId,storeId,obj){
    return $http.get(baseUrlService.baseUrl+'admin/event/'+storeId+'/'+eventId,{params:obj});       
  }
  function deleteEvent(){

  }
}
})(window.angular);
