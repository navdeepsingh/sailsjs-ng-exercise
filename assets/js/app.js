var app = angular.module('app', []);
app.controller('ctrlLogin',function($scope){
  $scope.login = function(){
    if($scope.loginForm.$valid){
      console.log("sending request to server");
    }
    else {
      $scope.loginForm.submitted = true;
    }
  }
})
