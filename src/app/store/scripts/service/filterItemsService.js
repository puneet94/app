(function(angular) {
	'use strict';
	angular.module('app.store')
		.factory('paramFactory', [paramFactory]);

	function paramFactory() {
		var obj = {};
		obj.paramData = {};
		obj.getParamData = function() {
			return obj.paramData;
		};
		obj.setParamData = function(paramData) {

			for (var k in paramData) {
				obj.paramData[k] = paramData[k];
			}

		};
		return obj;
	}
})(window.angular);
