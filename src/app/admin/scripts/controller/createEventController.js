(function(angular) {
	'use strict';
	angular.module('app.admin')

	.controller('CreateEventController', ['$scope', 'Upload', '$timeout', 'baseUrlService', '$mdDialog','$location','adminEventService','$stateParams',CreateEventController]);

	function CreateEventController($scope, Upload, $timeout, baseUrlService,$mdDialog,$location,adminEventService,$stateParams) {
		var coc = this;
		coc.eventForm = {};
		coc.eventForm.eventImages = [];
		coc.eventForm.category = [];
		activate();

		coc.createEvent = createEvent;
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
					coc.eventForm.bannerImage = coc.uploadedImage;
					console.log("the banner image");
					console.log(coc.eventForm);
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
						coc.eventForm.eventImages.push(response.data);
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

		function createEvent() {
			coc.eventForm.bannerImage = coc.eventForm.bannerImage || coc.eventForm.eventImages[0];
			adminEventService.createEvent($stateParams.storeId,coc.eventForm)
				.then(function(response) {
					console.log(response.data._id);
					userData.setUser();
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('Event created')
						.textContent('Your Event has been created.')
						.ariaLabel('Alert Dialog Demo')
						.ok('Got it!')

					);
					$location.url('/admin/adminEventPage/' + response.data._id);
					//$window.location.reload();
				}, function(response) {
					console.log(response);
				});
		}


		function activate() {

		}

	}
})(window.angular);
