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

app.controller('userController',function($scope, $http) {
  $scope.removeList = function () {

    var data = $.param({
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      age: $scope.age
    });

    $http.delete('/administrators' + data)
      .success(function (data, status, headers) {
        $scope.ServerResponse = data;
      })
      .error(function (data, status, header, config) {
        $scope.ServerResponse = htmlDecode("Data: " + data +
          "\n\n\n\nstatus: " + status +
          "\n\n\n\nheaders: " + header +
          "\n\n\n\nconfig: " + config);
      });
  };

});

app.config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    positionClass: 'toast-top-center',
  });
});
