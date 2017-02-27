(function(angular) {
    'use strict';
    angular.module('app.admin')

    .controller('EditStoreController', ['$auth', '$state', 'adminStoreService', 'Upload', '$stateParams', '$timeout', 'baseUrlService', '$mdDialog', EditStoreController]);

    function EditStoreController($auth, $state, adminStoreService, Upload, $stateParams, $timeout, baseUrlService, $mdDialog) {
        var csc = this;
        csc.storeForm = {};
        activate();
        csc.createStore = createStore;
        csc.uploadSingleImage = function(file, errFiles) {
            console.log("Enterd file uploading");
            csc.f = file;
            csc.errFile = errFiles && errFiles[0];
            if (file) {
                csc.formBannerLoading = true;
                file.upload = Upload.upload({
                    url: baseUrlService.baseUrl + 'upload/singleUpload',
                    data: { file: file }
                });
                csc.spinnerLoading = true;
                file.upload.then(function(response) {

                    file.result = response.data;
                    csc.storeForm.bannerImage = response.data;
                    csc.formBannerLoading = false;
                });
            }
        };
        csc.uploadMultipleImages = function(files) {
            csc.files = files;
            angular.forEach(files, function(file) {
                csc.formImgListLoading = true;
                file.upload = Upload.upload({
                    url: baseUrlService.baseUrl + 'upload/singleUpload',
                    data: { file: file }
                });

                file.upload.then(function(response) {
                    $timeout(function() {
                        file.result = response.data;
                        console.log(response.data);
                        csc.storeForm.storeImages.push(response.data);
                        csc.formImgListLoading = false;
                    });
                }, function(response) {
                    if (response.status > 0)
                        csc.errorMsg = response.status + ': ' + response.data;
                }, function(evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            });

        };

        function createStore() {
            adminStoreService.updateStore($stateParams.storeId, csc.storeForm)
                .then(function(response) {
                    console.log(response);
                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Store edited')
                        .textContent('Your Store has been edited.')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                    );
                    $state.reload();
                }, function(response) {
                    console.log(response);
                });
        }
        function activate() {
            adminStoreService.getStore($stateParams.storeId).then(function(response) {
                response.data.category = response.data.category;
                response.data.subCategory = response.data.subCategory;
                response.data.keywords = response.data.keywords.join(",");
                console.log(response);
                csc.storeForm = response.data;
            });
        }
    }
})(window.angular);
