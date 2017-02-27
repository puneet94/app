(function(angular) {
	'use strict';
	angular.module('app.store')
		.directive('filterDirective', ['$rootScope', 'paramFactory', filterDirective])
		.directive('addClass', [addClassDirective])
		.directive('removeClass', [removeClassDirective])
		.directive('siblingRemoveClass', [siblingRemoveClassDirective]);

	function filterDirective($rootScope, paramFactory) {
		return {
			restrict: 'E',
			templateUrl: 'app/store/views/filterDirectiveTemplate.html',
			scope: {
				filterName: "@filterName",
				radioRepeat: "=radioRepeat",
				radioModel: "=radioModel"
			},
			controller: ['$scope', function($scope) {
				$scope.filterLimit = 5;
				$scope.paramData = paramFactory.getParamData();
				
				$scope.clearClick = function() {
					delete $scope.radioModel[$scope.filterName];
					delete $scope.paramData[$scope.filterName];
					$scope.paramData.page = 1;
					paramFactory.setParamData($scope.paramData);
					$rootScope.$broadcast('filterClicked');
				};
				$scope.radioChange = function() {
					$scope.paramData[$scope.filterName] = $scope.radioModel[$scope.filterName];
					$scope.paramData.page = 1;
					paramFactory.setParamData($scope.paramData);
					console.log("filter started");
					$rootScope.$broadcast('filterClicked');

				};
				$scope.loadMoreFilters = function(){
					$scope.filterLimit+=5;

				};
				

			}]

		};
	}

	function addClassDirective() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				$(element).on('click', function() {
					//$(element).removeClass('highlightClass');
					$(this).addClass(attrs.addClass);

				});

			}
		};
	}

	function siblingRemoveClassDirective() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				$(element).on('click', function() {
					$(this).siblings().removeClass(attrs.siblingRemoveClass);
				});

			}
		};
	}

	function removeClassDirective() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				$(element).on('click', function() {
					$(this).siblings('.filterDirectiveRadioGroup').find('.filterRadioButton').removeClass(attrs.removeClass);
				});

			}
		};
	}


})(window.angular);
