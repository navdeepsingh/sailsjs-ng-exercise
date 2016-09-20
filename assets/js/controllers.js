'use strict';

angular.module('sailsjsApp')
	.controller('ctrlLogin',function($scope, $http, toastr, common){

		$scope.loading = common.loading;
		$scope.date = new Date();
		$scope.user = { email: '', password: '' };
		var config = {
		                headers : {
		                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
		                }
		            }

		$scope.login = function(){

		    if($scope.loginForm.$valid){
		    	$scope.loading = true;
		      $http.post('/login', $scope.user, config)
		            .success(function (data, status, headers, config) {
	                  if(!data.user){
	                    toastr.error(data.message, 'Error');
	                  }
	                  else{
	                    toastr.success('',data.message);
	                    window.location.href = data.redirect;
	                  }
	                  		            $scope.loading = false;
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

angular.module('sailsjsApp')
	.controller('userController',function($scope, $http, toastr, common){

		$scope.loading = true;

		$scope.sortType = 'firstName'; // set the default sort type

		var config = {
	        headers : {
	            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
	        }
	    }

	    $scope.currentPage = 0;
	  	$scope.pageSize = 20;

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
			$scope.data.user.roles = ['minimal'];
			$scope.getRoles();
			$scope.getUsers();
			$('select#roles option').removeAttr('selected');
			$('#userFormModal').modal();
		};

		$scope.editAdminForm = function(id, roles) {
			$scope.data.modalTitle = 'Edit Admin';
			$scope.data.createButtonFlag = false;
			$scope.data.editButtonFlag = true;
			$scope.data.required = false;
			$scope.getRoles();
			$http.get('/api/user/'+id).success(function(data){
				$scope.data.user = data[0];
				$scope.data.user.roles = roles;
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
					$scope.getUsers();
					if(!data.nModified){
	                    toastr.error(data.message, 'Error');
	                }
	                else{
	            		toastr.success('',message);
	                	$('#userFormModal').modal('hide');
	                }
	            });
		};

		$scope.deleteUser = function(id){
			 $('#confirmModal').modal({ backdrop: 'static', keyboard: false })
		        .one('click', '#delete', function() {
		            $http.delete('/api/user/'+id).success(function(responseDelete){
						$scope.getUsers();
						toastr.success('',responseDelete.message);
					});
		        });
		},

		$scope.getUsers = function () {
			$http.get('/api/user').success(function(data){
				$scope.currentPage = 0;
	  			$scope.pageSize = 10;
			  	$scope.data.users = data.results;
			  	$scope.data.loggedInUser = data.loggedInUser;
			  	$scope.loading = false;
			});
		}

		$scope.getRoles = function () {
			$http.get('/api/roles').success(function(allRoles){
		    	$scope.data.allRoles = allRoles;
			});
		}	

		$scope.numberOfPages=function(){
		   return Math.ceil($scope.data.users.length/$scope.pageSize);
		}

		$scope.init();
});

angular.module('sailsjsApp')
	.controller('ctrlRoles',function($scope, $http, toastr){

		var config = {
	        headers : {
	            'Content-Type': 'application/json;'
	        }
	    }
	    $scope.data = {
	    	super : [],
	    	minimal : []
	    }

	    $scope.init = function(){
	    	$http.get('/api/roles/menus').success(function(response){
	    		$scope.data.super = response.super;
	    		$scope.data.minimal = response.minimal;
	    	});
	    }

	    $scope.toggleSelection = function toggleSelection(roleName, menuName) {
	    	//console.log(roleName);
	    	var model;
	    	if (roleName == 'super')
	    		model = $scope.data.super;
	    	else
	    		model = $scope.data.minimal;

	    	var	idx = model.indexOf(menuName);

	    	// is currently selected
	    	if(idx > -1) {
	    		model.splice(idx,1);
	    	}

	    	// is new selected
	    	else {
	    		model.push(menuName);
	    	}
	    }

	    $scope.save = function(){
	    	$http.post('/roles/save', $scope.data, config)
		            .success(function (data, status, headers, config) {
	            		toastr.success('',data.message);
	                });
	    }
});