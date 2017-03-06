(function(angular){
	'use strict';

	angular.module('app.home')
	.controller('EntitySearchPageController',["$scope",'cityStorage',"$state", '$stateParams','$ionicHistory','searchService',EntitySearchPageController]);

	function EntitySearchPageController($scope,cityStorage,$state,$stateParams,$ionicHistory,searchService){
			var espc = this;
			activate();
			
            espc.city = cityStorage.getCity();
            espc.closeCitySearchPage = closeCitySearchPage;
            espc.goBackPage = goBackPage;
            espc.entityTextChange = entityTextChange;
            espc.itemSelected = itemSelected;
            function goBackPage(){
                
                 $ionicHistory.goBack();
            }
            function closeCitySearchPage(){
                $state.go('tabs.home');
            }
            function itemSelected(item){
                
            var changeEntity = item.userSearchString.split("#&#")[1];
            var entityName = item.userSearchString.split("#&#")[0];
            var location = cityStorage.getCity();
            
           
            if (changeEntity == "store") {

                
                //$window.location.href =baseUrlService.baseUrl+ '#' + espc.url + entityName + "/" + location + "/" + espc.slug;
                $state.go('tabs.storesCollectionName',{storeName:entityName,location:espc.city});
            } else if (changeEntity == "store-category") {

                
                //$window.location.href =baseUrlService.baseUrl+ '#' + espc.url + entityName + "/" + location + "/" + espc.slug;
                $state.go('tabs.storesCollectionCategory',{category:entityName,location:espc.city});
            } else if (changeEntity == "product") {

                
                //$window.location.href =baseUrlService.baseUrl+ '#' + espc.url + entityName + "/" + location + "/" + espc.slug;
                $state.go('tabs.storesCollectionCategory',{category:entityName,location:espc.city});

            } else if (changeEntity == "product-category") {

                
                //$window.location.href =baseUrlService.baseUrl+ '#' + espc.url + entityName + "/" + location + "/" + espc.slug;
                $state.go('tabs.productsCollectionCategory',{category:entityName,location: location});

            } else if (changeEntity == "product-subcategory") {

                
                //$window.location.href =baseUrlService.baseUrl+ '#' + espc.url + entityName + "/" + location + "/" + espc.slug;
                $state.go('tabs.productsCollectionSubCategory',{subCategory:entityName,location: location});
            } else if (changeEntity.trim().indexOf("products")!=-1) {
                
                $state.go('tabs.productsCollectionLocation',{location:espc.city});

            } else if (changeEntity.trim().indexOf("offers")!=-1) {
               $state.go('tabs.offers.offersCollectionLocation',{location:espc.city});
                

            } else {

                $state.go('tabs.storesCollectionLocation',{location:espc.city});
            }   
            }
            
            function entityTextChange() {

            if(espc.entitySearchModel){
                searchService.getAjaxSearches(espc.city, espc.entitySearchModel)
                    .then(function(resource) {
                        espc.entitySearchItems = [];
                        espc.entitySearchItems = resource.data;
                        
                    });
            }
            else{
                setSearches();
            }
            
            }
            function setSearches(){
            searchService.getSearches(espc.city).then(function(resource) {
                var allStoresItem = { "userSearchString": "All stores#&#stores#&#" + espc.city };
                var allProductsItem = { "userSearchString": "All products#&#products#&#" + espc.city };
                var allOffersItem = { "userSearchString": "All offers#&#offers#&#" + espc.city };
                espc.entitySearchItems = resource.data;
                espc.entitySearchItems.unshift(allStoresItem, allProductsItem,allOffersItem);
                

            }, function(data) {
                console.log(data);
            });

        }
	        function activate() {
                setSearches();
            }
	    	
	}

})(window.angular);
