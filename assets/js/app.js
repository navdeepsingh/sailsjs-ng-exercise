var app = angular.module('app', []);

app.controller('ctrlLogin',function($scope, $http){

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
                $scope.PostDataResponse = data;
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
})
