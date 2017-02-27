(function(angular){
  'use strict';
  angular.module('app.store')
  .directive('imageReplace',['$timeout',imageReplaceDirective]);

  function imageReplaceDirective($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
      	console.log(element);
      	console.log( $(element).attr('src'));
      	console.log(attrs.imageReplace);
      	$timeout(function(){
      		$(element).attr('src',attrs.imageReplace);
      	},1000);
        
      }
    };
  }


})(window.angular);
