

(function(angular){
	'use strict';
  angular.module('app.admin')

    .controller('StoreStatisticsController',[StoreStatisticsController]);
    function StoreStatisticsController(){
    	var ssc = this;
    	ssc.tab = 1;

        ssc.setTab = function(newTab) {
            ssc.tab = newTab;
        };

        ssc.isSet = function(tabNum) {
            return ssc.tab === tabNum;
        };
    	
    }
})(window.angular);
