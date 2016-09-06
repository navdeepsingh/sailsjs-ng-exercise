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

	$scope.user = {
		id : '',
		firstName : '',
		lastName : '',
		email : '',
		gender : '',
		age : '',
		roles : ''
	}

	$scope.reset = function() {
        $scope.user = angular.copy($scope.user);
    };

	$scope.editUser = function(){
		alert('edit');
	};

	$scope.createAdminForm = function(){
		$scope.modalTitle = 'Create New Admin';
		$scope.reset();
		$('#userFormModal').modal();
	};

	$scope.editAdminForm = function(id) {
		$scope.modalTitle = 'Edit Admin';		
		$http.get('/api/user/'+id).success(function(data){
			$scope.user = data[0];
			$('#userFormModal').modal();
		})
		
	};
});

app.config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    positionClass: 'toast-top-center',
  });
});
