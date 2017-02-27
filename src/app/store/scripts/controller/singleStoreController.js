(function(angular) {
    'use strict';
    angular.module('app.store')

    .controller('SingleStoreController', ["$scope", "$auth", '$location', 'userData', "$stateParams", "storeData", "getSingleStore", '$mdDialog', 'NgMap', 'getStoreCollectionService', SingleStoreController]);

    function SingleStoreController($scope, $auth, $location, userData, $stateParams, storeData, getSingleStore, $mdDialog, NgMap, getStoreCollectionService) {

        NgMap.getMap().then(function(map) {
            
        });
        var ssc = this;


        ssc.tab = 1;

        ssc.setTab = function(newTab) {
            ssc.tab = newTab;
        };

        ssc.isSet = function(tabNum) {
            return ssc.tab === tabNum;
        };


        ssc.storeData = {};
        ssc.loading = true;
        ssc.authCheck = $auth.isAuthenticated();
        if (ssc.authCheck) {
            ssc.currentUserId = userData.getUser()._id;
        }
        ssc.getAddressString = getAddressString;
        ssc.showStoreReportDialog = showStoreReportDialog;
        ssc.storeImagesObj = [];

        function getAddressString() {
            return Object.keys(ssc.storeData.address).map(function(key) {
                return ssc.storeData.address[key]; }).join(' ');
        }
        $scope.showAlert = function(ev) {

            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Claim Business')
                .textContent('If you are the owner of this store,then mail to us at shoppinsmail@gmail.com')
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
            );
        };
        function showStoreReportDialog(ev) {
            $mdDialog.show({
                    controller: 'UserStoreReportController',
                    controllerAs: 'usr',
                    templateUrl: 'app/store/views/userStoreReportTemplate.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true // Only for -xs, -sm breakpoints.*/
                })
                .then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
        }
        getSingleStore.getStore($stateParams.storeId)
            .then(function(res) {
                storeData.setStore(res.data);
                ssc.storeData = res.data;
                ssc.addressMap = ssc.storeData.address.area;
                if (ssc.storeData.address.latitude) {
                    ssc.pos = [ssc.storeData.address.latitude, ssc.storeData.address.longitude];
                } else {
                    ssc.pos = [17.361625, 78.474622];
                }

                for (var i = 0; i < ssc.storeData.storeImages.length; i++) {
                    var obj = {};
                    obj.src = ssc.storeData.storeImages[i];
                    ssc.storeImagesObj.push(obj);
                }

                ssc.loading = false;

                getStoreCollectionService.getStoreCollection('store/storesCollection/stores/' + ssc.storeData.address.city + '/1', { 'limit': 9 })
                    .then(function(response) {
                        ssc.storeSuggestions = response.data.docs;
                    });
            });
        getSingleStore.getStoreRating($stateParams.storeId)
            .then(function(res) {
                ssc.storeData.storeRatingAvg = res.data;
            });


    }

})(window.angular);
