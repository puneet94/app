(function(angular){
	'use strict';

	angular.module('app.home')
	.controller('CategoryBoxListController',["$scope","changeBrowserURL",'cityStorage',"$auth", 'getStoreCollectionService',CategoryBoxListController]);

	function CategoryBoxListController($scope,changeBrowserURL,cityStorage,$auth,getStoreCollectionService){
			var cblc = this;
			cblc.isAuth = $auth.isAuthenticated();
			cblc.storeCategoryCollection = storeCategoryCollection;
			activate();
			cblc.categoryBoxList = [];
			cblc.currentCity  = cityStorage.getCity() || 'hyderabad';


			function activate(){
				
				getCategories();
			}

			function getCategories(){
				var params = {
					location:cblc.currentCity,
					page: 1,
					limit: 10,
					sort: '-count'
				};
				getStoreCollectionService
					.categoryCollection(params)
					.then(function(res){
						
						cblc.categoryBoxList = res.data.docs.map(function(item){
							var categoryBox = {};
							categoryBox.category = item;
							categoryBox.storesList = [];
							storeCategoryCollection(categoryBox);
							return categoryBox;
						});
						

					});
			}
			function storeCategoryCollection(categoryBox){
				var params = {};
				params.location = cblc.currentCity;
				params.category = categoryBox.category;
				params.page = 1;
				params.limit = 6;
				getStoreCollectionService
					.storesCollection(params)
					.then(function(res){
						
						categoryBox.storesList = res.data.docs;
					});
			}
			
	  
	}

})(window.angular);
