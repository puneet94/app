//inject angular file upload directives and services.
(function(angular){
  'use strict';
angular.module('app.user')
  .controller('UserActionListController', ['$scope','userData','changeBrowserURL',UserActionListController]);
  function UserActionListController($scope,userData,changeBrowserURL ) {
  		var originatorEv;
      var ualc = this;
      ualc.openMenu = openMenu;
      ualc.getUserPage = getUserPage;
      ualc.getAdminStore = getAdminStore;
      ualc.createNewStore = createNewStore; 
      activate();
      function getAdminStore(storeId){
        changeBrowserURL.changeBrowserURLMethod('/admin/adminStorePage/'+storeId);
      }
      function getUserPage(){
      	userData.getUserPage(userData.getUser()._id);
      }
      function openMenu($mdOpenMenu, ev) {
	      originatorEv = ev;
	      $mdOpenMenu(ev);
		  }
      function createNewStore(){

        changeBrowserURL.changeBrowserURLMethod('/admin/createStore/'); 
      }


      function activate(){
        ualc.user = userData.getUser();
        ualc.userProfilePic = userData.getUser().picture;
        ualc.userStoresList = userData.getUser().storeId;
      	
      }
  }
})(window.angular);
