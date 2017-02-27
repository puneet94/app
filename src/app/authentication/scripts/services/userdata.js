(function(angular){
'use strict';

/**
 * @ngdoc service
 * @name authModApp.userData
 * @description
 * # userData
 * Factory in the authModApp.
 */
angular.module('authModApp')
  .factory('userData',['$window','$state','$auth','$http',"baseUrlService","changeBrowserURL",userData]);

  function userData($window,$state,$auth,$http,baseUrlService,changeBrowserURL) {
    var storage = $window.localStorage;
    var cachedUser={};
    var obj1 =  {
      setUser: function (user) {
        
        if(user){
          storage.setItem('user',JSON.stringify(user));
        }
        else{

          var userId = $auth.getPayload().sub;
          if(userId){
            $http.get(baseUrlService.baseUrl+'authenticate/user/'+userId).then(function(res){
              
              if(obj1.isUserExists()){
                  storage.removeItem('user');
              }

              storage.setItem('user',JSON.stringify(res.data.user));
              //
              //$state.reload();
            //  $window.location.reload();

            },function(res){
              console.log(res);
            });
          }
        }
        

      },
      getUser: function(){

        return JSON.parse(storage.getItem('user'));
      //   if(!cachedUser){
      //     cachedUser = storage.getItem('user');
      //   }
      // return cachedUser;
      },
      removeUser: function(){
        cachedUser = null;
        //console.log('***********logged out*************');
        storage.removeItem('user');
      },
      isUserExists: function(){
        if(obj1.getUser()){
          return true;
        }
        return false;
      },
      getUserPage: function(userId){
        var url = "/user/"+userId;
        changeBrowserURL.changeBrowserURLMethod(url);
      }
    };
    return obj1;
  }
})(window.angular);
