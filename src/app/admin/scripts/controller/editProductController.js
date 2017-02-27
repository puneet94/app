(function(angular) {
	'use strict';
	angular.module('app.admin')

	.controller('EditProductController', ['$auth', 'adminProductService', '$stateParams', '$mdDialog', 'product','Upload', 'baseUrlService',EditProductController]);

	function EditProductController($auth, adminProductService, $stateParams, $mdDialog,product,Upload, baseUrlService) {
		var csc = this;
		csc.productForm = product;
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
			adminProductService.updateProduct($stateParams.storeId,product._id, csc.productForm)
				.then(function(response) {
					console.log(response);
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('Product Edited')
						.textContent('Your Product has been edited.')
						.ariaLabel('Alert Dialog Demo')
						.ok('Got it!')

					);
				}, function(response) {
					console.log(response);
				});
		}


		function activate() {
			/*adminProductService.getProduct($stateParams.productId).then(function(response) {
				console.log(response);

				response.data.category = response.data.category.join(",");
				response.data.subCategory = response.data.subCategory.join(",");
				response.data.keywords = response.data.keywords.join(",");
				console.log(response);
				csc.productForm = response.data;
			});*/
		}
	}
})(window.angular);
