(function(angular) {
  'use strict';
  angular.module('app.event')
    .controller('AdminEventsCollectionController', ["$scope", "$auth", "$stateParams", "changeBrowserURL", "eventService", AdminEventsCollectionController]);

  function AdminEventsCollectionController($scope, $auth, $stateParams, changeBrowserURL, eventService) {
    var occ = this;
    occ.pageNo = 0;
    occ.eventsList = [];
    
    occ.getEventsCollection = getEventsCollection;

    activate();
    
    function getEventsCollection() {
      occ.loading = true;
      occ.pageNo = occ.pageNo + 1;
      
      occ.paramData = {'store': $stateParams.storeId,'limit':100,'page':1,'populate':'store'};
      console.log(occ.paramData);
      eventService.getEventCollection( occ.paramData)
        .then(function(response) {
          console.log("events collection");
          console.log(response);
          if (response.data.docs.length === 0) {
            occ.noeventsToShow = true;

          } else {
            occ.noeventsToShow = false;
            occ.eventsList = response.data.docs;
          }

          occ.loading = false;
        }, function(response) {
          console.log(response);
        });
    }

    function activate() {
      occ.getEventsCollection();
    }

  }




})(window.angular);
