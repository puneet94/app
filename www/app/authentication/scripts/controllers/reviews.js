// 'use strict';
//
// /**
//  * @ngdoc function
//  * @name authModApp.controller:ReviewsCtrl
//  * @description
//  * # ReviewsCtrl
//  * Controller of the authModApp
//  */
//  /*reviews.reviewsList
// reviews.userReview
// reviews.submitReview()*/
// angular.module('authModApp')
//   .controller('ReviewsCtrl', ["$http","$auth",reviewsCtrl]);
//   function reviewsCtrl($http,$auth) {
//     var reviews = this;
//     reviews.user = {};
//     reviews.submitReview = submitReview;
//     $http.get('http://localhost:8000/reviews/user/'+$auth.getPayload()["sub"])
//     	.then(function(response){
//     		console.log(response);
//     	},function(response){
//     		console.log(response);
//     	});
//     function submitReview(){
//     	reviews.user.userId = $auth.getPayload()["sub"];
//     	console.log(reviews.user);
//     	$http.post("http://localhost:8000/reviews",reviews.user)
//     		.then(function(response){
//     			console.log(response);
//     		},function(response){
//     			console.log(response);
//     		});
//
//     }
//   }
