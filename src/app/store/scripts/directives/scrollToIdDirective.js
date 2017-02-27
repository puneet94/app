(function(angular){
  'use strict';
  angular.module('app.store')
  .directive('scrollToId',['scrollToIdService',scrollToIdDirective]);

  function scrollToIdDirective(scrollToIdService) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        $(element).on('click',function(){
          scrollToIdService.scrollToId(attrs.scrollToId);
        });
      }
    };
  }


})(window.angular);
