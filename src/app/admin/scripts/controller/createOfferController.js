(function(angular) {
	'use strict';
	angular.module('app.admin')

	.controller('CreateOfferController', ['$scope', 'Upload', '$timeout', 'baseUrlService', '$mdDialog','$location','adminOfferService','$stateParams',CreateOfferController]);

	function CreateOfferController($scope, Upload, $timeout, baseUrlService,$mdDialog,$location,adminOfferService,$stateParams) {
		var coc = this;
		coc.offerForm = {};
		coc.offerForm.offerImages = [];
		coc.offerForm.category = [];
		activate();

		coc.createOffer = createOffer;
		coc.uploadSingleImage = function(file, errFiles) {
			coc.f = file;
			coc.errFile = errFiles && errFiles[0];
			if (file) {
				coc.formBannerLoading = true;

				file.upload = Upload.upload({
					url: baseUrlService.baseUrl + 'upload/singleUpload',
					data: { file: file }
				});

				file.upload.then(function(response) {
					file.result = response.data;
					coc.uploadedImage = response.data;
					coc.offerForm.bannerImage = coc.uploadedImage;
					console.log("the banner image");
					console.log(coc.offerForm);
					coc.formBannerLoading = false;

				});
			}
		};
		coc.uploadMultipleImages = function(files) {
			coc.files = files;
			coc.formImgListLoading = true;
			angular.forEach(files, function(file) {
				coc.formImgListLoading = true;
				file.upload = Upload.upload({
					url: baseUrlService.baseUrl + 'upload/singleUpload',
					data: { file: file }
				});

				file.upload.then(function(response) {
					$timeout(function() {
						file.result = response.data;
						console.log(response.data);
						coc.offerForm.offerImages.push(response.data);
						coc.formImgListLoading = false;
					});
				}, function(response) {
					if (response.status > 0)
						coc.errorMsg = response.status + ': ' + response.data;
				}, function(evt) {
					file.progress = Math.min(100, parseInt(100.0 *
						evt.loaded / evt.total));
				});
			});


		};

		function createOffer() {
			coc.offerForm.bannerImage = coc.offerForm.bannerImage || coc.offerForm.offerImages[0];
			adminOfferService.createOffer($stateParams.storeId,coc.offerForm)
				.then(function(response) {
					console.log(response.data._id);
					userData.setUser();
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('Offer created')
						.textContent('Your Offer has been created.')
						.ariaLabel('Alert Dialog Demo')
						.ok('Got it!')

					);
					$location.url('/admin/adminOfferPage/' + response.data._id);
					//$window.location.reload();
				}, function(response) {
					console.log(response);
				});
		}


		function activate() {

		}

	}
})(window.angular);
