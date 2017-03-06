(function(angular) {
	'use strict';
	angular.module('app.admin')

	.controller('CreateOfferController', ['$scope', 'Upload', '$timeout', 'baseUrlService', '$mdDialog', '$location', 'adminOfferService', '$stateParams', '$state', '$cordovaGeolocation', CreateOfferController]);

	function CreateOfferController($scope, Upload, $timeout, baseUrlService, $mdDialog, $location, adminOfferService, $stateParams, $state, $cordovaGeolocation) {
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
			adminOfferService.createOffer($stateParams.storeId, coc.offerForm)
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
			//google.maps.event.addDomListener(window, 'load', googleMap);


			/*$timeout(function() {
				googleMap();
			});*/
			loadGoogleMaps();

		}

		function loadGoogleMaps() {

			window.mapInit = function() {
				googleMap();
			};
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.id = "googleMaps";

			var mapsTag = document.getElementById('googleMaps');
			if (mapsTag) {
				alert("hihihihit");
				mapsTag.parentElement.removeChild(mapsTag);
			}
			var apiKey = 'AIzaSyDGTEBHgF0pPjYvmmrlHYLUyksDW70lNWU';

			script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&libraries=places&callback=mapInit';
			document.body.appendChild(script);

		}

		function autocompleteMaps(marker) {
			var input = document.getElementById('offer-map-input');
			var autocomplete = new google.maps.places.Autocomplete(input);

			autocomplete.addListener('place_changed', function() {

				var place = autocomplete.getPlace();

				var latLng = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
				if (!place.geometry) {
					// User entered the name of a Place that was not suggested and
					// pressed the Enter key, or the Place Details request failed.
					window.alert("No details available for input: '" + place.name + "'");
					return;
				}

				// If the place has a geometry, then present it on a map.

				marker.setPosition(latLng);
				marker.setMap($scope.map);

				$scope.map.setCenter(latLng);
			});

		}

		function googleMap() {
			var options = { timeout: 10000, enableHighAccuracy: false };
			var marker;
			$cordovaGeolocation.getCurrentPosition(options).then(function(position) {
				var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				var mapOptions = {
					center: latLng,
					zoom: 15,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};

				$scope.map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
				google.maps.event.addListenerOnce($scope.map, 'idle', function() {

					marker = new google.maps.Marker({
						map: $scope.map,
						animation: google.maps.Animation.DROP,
						position: latLng
					});

					autocompleteMaps(marker);

				});

				google.maps.event.addListener($scope.map, 'click', function(event) {

					//console.log(marker);
					if (marker) {
						marker.setPosition(event.latLng);
						marker.setMap($scope.map);
					} else {

						marker = new google.maps.Marker({
							position: event.latLng,
							map: $scope.map
						});
					}
				});


			}, function(error) {
				alert("error");
				console.log("error is here");
				console.log(error);
			});
		}




	}
})(window.angular);
