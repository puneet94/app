(function(angular) {
	'use strict';
	angular.module('app.admin')

	.controller('CreateProductController', ['$stateParams', '$timeout', '$state', 'adminProductService', 'Upload', 'baseUrlService', '$mdDialog', CreateProductController]);

	function CreateProductController($stateParams, $timeout, $state, adminProductService, Upload, baseUrlService, $mdDialog) {

		var csc = this;
		csc.productForm = {};
		csc.productForm.price = {};
		csc.productForm.category = [];
		csc.productForm.subCategory = [];
		csc.productForm.productImages = [];
		activate();
		csc.createProduct = createProduct;

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

						csc.productForm.productImages.push(response.data);
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
		csc.uploadSingleImage = function(file, errFiles) {

			csc.f = file;
			csc.errFile = errFiles && errFiles[0];
			if (file) {
				csc.formBannerLoading = true;
				file.upload = Upload.upload({
					url: baseUrlService.baseUrl + 'upload/singleUpload',
					data: { file: file }
				});

				file.upload.then(function(response) {

					file.result = response.data;
					csc.productForm.bannerImage = response.data;

					$('.productMainImage').css('background-image', 'url(' + response.data + ')');
					csc.formBannerLoading = false;

				});
			}
		};

		function createProduct() {
			adminProductService.createProduct(csc.productForm, $stateParams.storeId)
				.then(function(response) {

					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('Product created')
						.textContent('Your Product has been created.')
						.ariaLabel('Alert Dialog Demo')
						.ok('Got it!')

					);
					$state.reload();
				}, function(response) {
					console.log(response);
				});
		}


		function activate() {

		}
	}
})(window.angular);
