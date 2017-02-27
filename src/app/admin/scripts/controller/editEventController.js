(function(angular) {
	'use strict';
	angular.module('app.admin')

	.controller('EditEventController', ['$scope', 'Upload', '$timeout', 'baseUrlService', '$mdDialog', '$stateParams','$location', 'adminEventService', EditEventController]);

	function EditEventController($scope, Upload, $timeout, baseUrlService, $mdDialog, $stateParams,$location, adminEventService) {
		var eoc = this;
		eoc.eventForm = {};
		eoc.eventForm.eventImages = [];
		eoc.eventForm.category = [];
		activate();

		eoc.createEvent = createEvent;
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
					eoc.eventForm.bannerImage = eoc.uploadedImage;
					console.log("the banner image");
					console.log(eoc.eventForm);
					$('.adminEventBannerImage').css('background-image', 'url(' + response.data + ')');
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
						eoc.eventForm.eventImages.push(response.data);
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

		function createEvent() {
			eoc.eventForm.bannerImage = eoc.eventForm.bannerImage || eoc.eventForm.eventImages[0];
			adminEventService.updateEvent($stateParams.eventId,$stateParams.storeId,eoc.eventForm)
				.then(function(response) {
					console.log(response.data._id);
					
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('Event created')
						.textContent('Your Event has been edited.')
						.ariaLabel('Alert Dialog Demo')
						.ok('Got it!')

					);
					$location.url('/event/' + response.data._id);
					//$window.location.reload();
				}, function(response) {
					console.log(response);
				});
		}


		function activate() {
			adminEventService.getEvent($stateParams.eventId,$stateParams.storeId).then(function(response) {
				//response.data.category = response.data.category;
				
				response.data.startDate = new Date(response.data.startDate);
				response.data.endDate = new Date(response.data.endDate);
				console.log(response);
				eoc.eventForm = response.data;
			});

		}

	}
})(window.angular);
