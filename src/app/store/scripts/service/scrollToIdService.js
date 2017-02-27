


(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.store')
  .service('scrollToIdService',[ScrollToIdService]);

/*
  * This servic has a function names getStore which takes id as parameter and returns a promise
*/
function ScrollToIdService(){
  this.scrollToId = scrollToId;

  function scrollToId(blockId){
    var container = $('body');
    console.log('Inside the service of scroll');

    var scrollTo = $('#'+blockId);
    console.log(scrollTo);
    container.animate({
        scrollTop: scrollTo.offset().top //- container.offset().top + container.scrollTop()
    });
  }
}
})(window.angular);
