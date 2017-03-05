(function(angular) {
	'use strict';
	angular.module('app.admin')

	.controller('CreateProductController', ['$scope','$stateParams', '$timeout', '$state', 'adminProductService', 'Upload', 'baseUrlService', '$mdDialog', '$cordovaGeolocation',CreateProductController]);

	function CreateProductController($scope,$stateParams, $timeout, $state, adminProductService, Upload, baseUrlService, $mdDialog,$cordovaGeolocation) {

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
			loadGoogleMaps();
		}


		function loadGoogleMaps() {
			alert("load started from product");
			window.mapInit = function(){
      				googleMap();
    			};
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.id = "googleMaps";

			var mapsTag =  document.getElementById('googleMaps');
			if(mapsTag){
				alert("hit tag in product");
				mapsTag.parentElement.removeChild(mapsTag);	
			}
			
			var apiKey = 'AIzaSyDGTEBHgF0pPjYvmmrlHYLUyksDW70lNWU';
			if(typeof google == "undefined" || typeof google.maps == "undefined"){
				alert("script added from product");
				script.src = 'https://maps.google.com/maps/api/js?key=' + apiKey + '&callback=mapInit';	
				document.body.appendChild(script);
			}
			
			
			

			
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

				$scope.map = new google.maps.Map(document.getElementById("productGoogleMap"), mapOptions);
				google.maps.event.addListenerOnce($scope.map, 'idle', function() {

					marker = new google.maps.Marker({
						map: $scope.map,
						animation: google.maps.Animation.DROP,
						position: latLng
					});

					

				});

				google.maps.event.addListener($scope.map, 'click', function(event) {
					alert("from product page");
					alert(event.latLng);

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
