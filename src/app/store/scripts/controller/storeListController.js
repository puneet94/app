(function(angular) {
    'use strict';

    angular.module('app.store')

    .controller('StoreListController', ["$scope", "$stateParams", "changeBrowserURL", "$location", "baseUrlService", "getStoreCollectionService", StoreListController]);


    function StoreListController($scope, $stateParams, changeBrowserURL, $location, baseUrlService, getStoreCollectionService) {
        var slc = this;
        slc.pageNo = 0;
        slc.storesList = [];
        slc.getSingleStore = getSingleStore;
        slc.getStoresCollection = getStoresCollection;
        slc.storesSearchHeader = $stateParams.slug;
        activate();
        $scope.$on('parent', function(event, data) {
            slc.pageNo = 0;
            slc.paramData = data;
            slc.getStoresCollection();
        });

        function getSingleStore(store, scrollId) {
            var url = "store/singleStore/" + store._id + "/" + store.myslug;
            if (scrollId) {
                //url = url + "?scrollId="+scrollId;
                changeBrowserURL.changeBrowserURLMethod(url, scrollId);
            }
            changeBrowserURL.changeBrowserURLMethod(url);
        }

        function getStoresCollection() {
            slc.loading = true;
            slc.pageNo = slc.pageNo + 1;
            var location = $stateParams.location;
            var url = '';
            if ($location.absUrl().indexOf("/category/") != -1) {
                var category = $stateParams.category;
                url = 'store/storesCollection/category/' + category + '/' + location + '/' + slc.pageNo;
            } else if ($location.absUrl().indexOf("/storeName/") != -1) {
                var storeName = $stateParams.storeName;
                url = 'store/storesCollection/storeName/' + storeName + '/' + location + '/' + slc.pageNo;
            } else {
                url = 'store/storesCollection/stores' + '/' + location + '/' + slc.pageNo;
            }
            /*
              * This will work with mongoose-paginate only because the existencce of the button
                in html is dependant on the total documents retrieved
              * I check the total documents available to the length of array displayed.. if they both are equal
                then the button is hidden
            */
            getStoreCollectionService.getStoreCollection(url, slc.paramData)
                .then(function(response) {
                    slc.totalStores = response.data.total;
                    console.log(response);
                    if (slc.storesList.length === 0) {
                        var tempStoreList = [];
                        for (var i = response.data.docs.length - 1; i >= 0; i--) {
                            tempStoreList.push(response.data.docs[i]);

                        }
                        slc.storesList = tempStoreList;
                    } else {

                        if (slc.paramData && slc.pageNo == 1) {
                            slc.storesList = [];
                        }
                        for (var j = response.data.docs.length - 1; j >= 0; j--) {
                            slc.storesList.push(response.data.docs[j]);
                        }

                    }
                    slc.loading = false;
                }, function(response) {
                    console.log(response);
                });
        }

        function activate() {
            slc.getStoresCollection();
        }

    }

})(window.angular);
