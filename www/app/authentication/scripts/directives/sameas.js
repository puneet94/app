

/**
 * @ngdoc directive
 * @name authModApp.directive:sameAs
 * @description
 * # sameAs
 */
 (function(angular){
 'use strict';
	angular.module('authModApp')
		.directive('sameAs', function () {
			return {
				require: 'ngModel',
				restrict: 'EA',
				link: function postLink(scope, element, attrs,ngModelCtrl) {
          console.log(attrs);
          console.log(attrs.sameAs);
					//console.log(scope.$eval(attrs.sameAs));
					function validateEqual(value){
						var valid = (value === scope.$eval(attrs.sameAs));
						ngModelCtrl.$setValidity('equal',valid);
						return valid ? value : undefined;
					}
					ngModelCtrl.$parsers.push(validateEqual);
					ngModelCtrl.$formatters.push(validateEqual);
					scope.$watch(attrs.sameAs,function(){
						ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
					});
				}
			};
		});

})(window.angular);
