//inject angular file upload directives and services.
(function(angular){
  'use strict';
angular.module('app.user')
  .controller('UserProfileImageController', ['$scope', 'Upload', 'userData','baseUrlService',UserProfileImageController]);
  function UserProfileImageController($scope, Upload,userData, baseUrlService) {
      var upc = this;
      upc.spinnerLoading = false;
      upc.uploadFiles = function(file, errFiles) {
          console.log("Enterd file uploading");
          upc.f = file;
          upc.errFile = errFiles && errFiles[0];
          if (file) {
              file.upload = Upload.upload({
                  url: baseUrlService.baseUrl+'user/upload/profileImage/'+userData.getUser()._id,
                  data: {file: file}
              });
              upc.spinnerLoading = true;
              file.upload.then(function (response) {
                  
                      file.result = response.data;
                      userData.setUser();
                      userData.getUser().picture = response.data;
                      console.log("the image received");
                      console.log(response.data);
                      $('.userProfileImage').find('img').attr('src',response.data);
                      upc.spinnerLoading = false;
              });
          }
      };
  }
})(window.angular);
