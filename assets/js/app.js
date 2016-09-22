'use strict';

var app = angular.module('sailsjsApp', ['toastr']);
	app.config(function(toastrConfig) {
	  	angular.extend(toastrConfig, {
	    	positionClass: 'toast-top-right',
  		});
	});
	app.factory('common', function(){
  		return { loading: false };
	});
  /*app.run(function($rootScope){
      $rootScope._ = _;
  });*/
 /* app.directive("rolesImages", function() {
      return {
          template : "<img src='assets/images/{{ user.roles }}'>",
          link: function(scope, element, attr, ngModel) {

           console.log($scope.user.roles.split(","));
        }
      };
  });*/


