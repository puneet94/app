(function(angular){
  'use strict';
  angular.module('app.admin')

    .controller('AdminStoreController',['$scope','$stateParams','getSingleStore','Upload','baseUrlService',AdminStoreController]);
    function AdminStoreController($scope,$stateParams,getSingleStore,Upload,baseUrlService){	
    	var asc = this;
        asc.storeData = {};
        
        activate();
        
        asc.uploadStoreBanner = function(file, errFiles) {
          
          asc.f = file;
          asc.errFile = errFiles && errFiles[0];
          if (file) {
              asc.bannerLoading = true;
              file.upload = Upload.upload({
                  url: baseUrlService.baseUrl+'upload/storeBannerUpload/'+$stateParams.storeId,
                  data: {file: file}
              });
              
              file.upload.then(function (response) {
                  
                      file.result = response.data;
                      
                      console.log(response.data);
                      $('.adminStoreBannerImage').css('background-image','url('+response.data+')');
                      asc.bannerLoading = false;
              });
          }
      };
        function activate(){
            getSingleStore.getStore($stateParams.storeId)
            .then(function(res){
                asc.storeData = res.data;                
                //asc.showImagesCarousel = true;
                asc.loading = false;
        });

        getSingleStore.getStoreRating($stateParams.storeId)
            .then(function(res){
              asc.storeData.storeRatingAvg = res.data;
            });    
        }
    	
    }
})(window.angular);
