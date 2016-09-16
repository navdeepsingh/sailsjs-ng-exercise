'use strict';

angular.module('sailsjsApp', ['toastr'])
	.config(function(toastrConfig) {
	  	angular.extend(toastrConfig, {
	    	positionClass: 'toast-top-right',
  		});
	});

