(function(angular) {
  'use strict';
  angular.module('app.user')
    .directive('userSuggestionList', [userSuggestionList]);

  function userSuggestionList() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/user/views/userSuggestionList.html',
      scope: {
      	usersList: '='
      },
      link: function(scope, element, attrs) {
      	console.log("link");
      	console.log(scope);
      },
      controllerAs: 'vm',
      controller: ['$scope','$auth', 'userService', 'userData',function MyTabsController($scope, $auth,userService,userData) {
        var vm = this;
        vm.user = {};

        vm.loading = true;
        vm.authCheck =$auth.isAuthenticated();
        

    
    vm.currentUserFollowed = currentUserFollowed;
    vm.submitUserFollow = submitUserFollow;
    vm.deleteUserFollow = deleteUserFollow;
    vm.getUserPage = userData.getUserPage;

    function activate(){
      vm.loading = true;

      
    }
    function submitUserFollow(followerId){
      userService.submitUserFollow(userData.getUser()._id,followerId).then(function(response){

        
        userData.setUser();
      });
    }
    function deleteUserFollow(followerId){
    	if(vm.authCheck){
    		userService.deleteUserFollow(userData.getUser()._id,followerId).then(function(response){
        
        userData.setUser();
      });		
    	}
      
    }
    function currentUserFollowed(follower){
if(vm.authCheck){
      if(userData.getUser().following.indexOf(follower)==-1){
        return false;
      }
      return true;
    }}
      }],
    };
  }

})(window.angular);
