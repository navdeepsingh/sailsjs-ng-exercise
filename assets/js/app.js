'use strict';

var app = angular.module('app', ['toastr']);

app.controller('ctrlLogin',function($scope, $http, toastr){

	$scope.user = { email: '', password: '' };

	var config = {
	                headers : {
	                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
	                }
	            }	            

	$scope.login = function(){	  	 

	    if($scope.loginForm.$valid){
	      $http.post('/login', $scope.user, config)
	            .success(function (data, status, headers, config) {
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

app.controller('userController',function($scope, $http, toastr){

	var config = {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    }

    $scope.currentPage = 0;
  	$scope.pageSize = 10;

	$scope.data = {
		users : [],
		user : {
			firstName : '',
			lastName : '',
			email : '',
			gender : '',
			age : '',
			password : '',
			roles : []
		},
		createButtonFlag : true,
		editButtonFlag : false,
		modalTitle : 'Create New Admin',
		required : true,
		allRoles : [],
		loggedInUser : {}
	};

	$scope.orig = angular.copy($scope.data.user);


	$scope.reset = function() {
        $scope.data.user = angular.copy($scope.orig);
        $scope.data.createButtonFlag = true;
		$scope.data.editButtonFlag = false;
		$scope.data.modalTitle = 'Create New Admin';
    };

    $scope.init = function() {
		$scope.getUsers();
	 };

	$scope.createAdminForm = function(){
		$scope.reset();
		$http.get('/api/roles').success(function(allRoles){
		    	$scope.data.allRoles = allRoles;
		});
		$scope.data.user.roles = ['minimal'];
		$('select#roles option').removeAttr('selected');
		$('#userFormModal').modal();
	};

	$scope.editAdminForm = function(id, roles) {
		$scope.data = {
			modalTitle : 'Edit Admin',
			createButtonFlag : false,
			editButtonFlag : true,
			required : false
		}
		$http.get('/api/user/'+id).success(function(data){
			$scope.data.user = data[0];
			$http.get('/api/roles').success(function(allRoles){
		    	$scope.data.allRoles = allRoles;
		    });
		    //var rolesArray = roles.split(',');
			$scope.data.user.roles = roles;
			$scope.getUsers();
			$('#userFormModal').modal();
		});
	};

	$scope.createUser = function(){
		$http.post('/api/user', $scope.data.user, config)
			.success(function (data, status, headers, config) {
				var message = data.message;
				if(!data.user){
					angular.forEach(data.Errors, function(error){
						toastr.error(error[0].message, 'Error');
					});                    
                }
                else{
                	$scope.getUsers();
            		toastr.success('',message);
                	$('#userFormModal').modal('hide');
                }
            });
	};

	$scope.editUser = function(id){
		var userData = $scope.data.user;
		$http.put('/api/user/'+id, userData, config)
			.success(function (data, status, headers, config) {
				var message = 'Admin Updated Successfully';
				if(!data.nModified){
                    toastr.error(data.message, 'Error');
                }
                else{
                	$scope.getUsers();
            		toastr.success('',message);
                	$('#userFormModal').modal('hide');
                }
            });
	};

	$scope.deleteUser = function(id){
		if (confirm('Are you Sure?')){
			$http.delete('/api/user/'+id).success(function(responseDelete){
				$scope.getUsers();
				toastr.success('',responseDelete.message);
			});
		}

	},

	$scope.getUsers = function () {
		$http.get('/api/user').success(function(data){
		  	$scope.data.users = data.results;
		  	$scope.data.loggedInUser = data.loggedInUser;
		});
	}

	$scope.numberOfPages=function(){
	   return Math.ceil($scope.data.users.length/$scope.pageSize);
	}

});

app.filter('startFrom', function() {
  return function(input, start) {
    start = +start; //parse to int
    return input.slice(start);
  }
});

app.config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    positionClass: 'toast-top-right',
  });
});
