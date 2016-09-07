'use strict';

var app = angular.module('app', ['toastr']);

app.controller('ctrlLogin',function($scope, $http, toastr){


	$scope.jsonResponse = "";

	$scope.login = function(){

	  	var data = {
	                email: $scope.user.email,
	                password: $scope.user.password
	            };

	  	 var config = {
	                headers : {
	                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
	                }
	            }

	    if($scope.loginForm.$valid){
	      $http.post('/login', data, config)
	            .success(function (data, status, headers, config) {
	                $scope.jsonResponse = data;
                  if(!data.user){
                    toastr.error(data.message, 'Error');
                  }
                  else{
                    toastr.success('',data.message);
                    window.location.href = data.redirect;
                  }
	            })
	            .error(function (data, status, header, config) {
	                $scope.ResponseDetails = "Data: " + data +
	                    "<hr />status: " + status +
	                    "<hr />headers: " + header +
	                    "<hr />config: " + config;
	            });
	    }
	    else {
	      $scope.loginForm.submitted = true;
	    }
  }


});

app.controller('userController',function($scope, $http){

	$scope.data = {
		user : {
			id : '',
			firstName : '',
			lastName : '',
			email : '',
			gender : '',
			age : '',
			roles : []
		},
		createButtonFlag : true,
		editButtonFlag : false,
		modalTitle : 'Create New Admin',
		allRoles : []
	};

	$scope.orig = angular.copy($scope.data);

	$scope.reset = function() {
        $scope.data = angular.copy($scope.orig);        
    };

	$scope.createAdminForm = function(){
		$scope.reset();
		$http.get('/api/roles').success(function(allRoles){
		    	$scope.data.allRoles = allRoles;	  	
		});
		$('#userFormModal').modal();
	};

	$scope.editAdminForm = function(id, roles) {
		$scope.data = {
			modalTitle : 'Edit Admin',
			createButtonFlag : false,
			editButtonFlag : true
		}
		$http.get('/api/user/'+id).success(function(data){
			$scope.data.user = data[0];
			$http.get('/api/roles').success(function(allRoles){
		    	$scope.data.allRoles = allRoles;	  	
		    });
		    var rolesArray = roles.split(',');
			$scope.data.user.roles = rolesArray;
			$('#userFormModal').modal();
		});		
	};

	$scope.init = function() {
	    $http.get('/api/roles').success(function(data){
	    	$scope.data.allRoles = data;
	    });
	 };

	$scope.createUser = function(){
			
	};

	$scope.editUser = function(){
		
	};
});

app.config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    positionClass: 'toast-top-right',
  });
});
