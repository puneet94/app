(function(angular) {
	'use strict';
	angular.module('app.admin')

	.controller('EditOfferController', ['$scope', 'Upload', '$timeout', 'baseUrlService', '$mdDialog', '$stateParams','$location', 'adminOfferService', EditOfferController]);

	function EditOfferController($scope, Upload, $timeout, baseUrlService, $mdDialog, $stateParams,$location, adminOfferService) {
		var eoc = this;
		eoc.offerForm = {};
		eoc.offerForm.offerImages = [];
		eoc.offerForm.category = [];
		activate();

		eoc.createOffer = createOffer;
		eoc.uploadSingleImage = function(file, errFiles) {
			eoc.f = file;
			eoc.errFile = errFiles && errFiles[0];
			if (file) {
				eoc.formBannerLoading = true;

				file.upload = Upload.upload({
					url: baseUrlService.baseUrl + 'upload/singleUpload',
					data: { file: file }
				});

				file.upload.then(function(response) {
					file.result = response.data;
					eoc.uploadedImage = response.data;
					eoc.offerForm.bannerImage = eoc.uploadedImage;
					console.log("the banner image");
					console.log(eoc.offerForm);
					$('.adminOfferBannerImage').css('background-image', 'url(' + response.data + ')');
					eoc.formBannerLoading = false;

				});
			}
		};
		eoc.uploadMultipleImages = function(files) {
			eoc.files = files;
			eoc.formImgListLoading = true;
			angular.forEach(files, function(file) {
				eoc.formImgListLoading = true;
				file.upload = Upload.upload({
					url: baseUrlService.baseUrl + 'upload/singleUpload',
					data: { file: file }
				});

				file.upload.then(function(response) {
					$timeout(function() {
						file.result = response.data;
						console.log(response.data);
						eoc.offerForm.offerImages.push(response.data);
						eoc.formImgListLoading = false;
					});
				}, function(response) {
					if (response.status > 0)
						eoc.errorMsg = response.status + ': ' + response.data;
				}, function(evt) {
					file.progress = Math.min(100, parseInt(100.0 *
						evt.loaded / evt.total));
				});
			});


		};

		function createOffer() {
			eoc.offerForm.bannerImage = eoc.offerForm.bannerImage || eoc.offerForm.offerImages[0];
			adminOfferService.updateOffer($stateParams.offerId,$stateParams.storeId,eoc.offerForm)
				.then(function(response) {
					console.log(response.data._id);
					
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('Offer created')
						.textContent('Your Offer has been edited.')
						.ariaLabel('Alert Dialog Demo')
						.ok('Got it!')

					);
					$location.url('/offer/' + response.data._id);
					//$window.location.reload();
				}, function(response) {
					console.log(response);
				});
		}


		function activate() {
			adminOfferService.getOffer($stateParams.offerId,$stateParams.storeId).then(function(response) {
				//response.data.category = response.data.category;
				
				response.data.startDate = new Date(response.data.startDate);
				response.data.endDate = new Date(response.data.endDate);
				console.log(response);
				eoc.offerForm = response.data;
			});

		}

	}
})(window.angular);
