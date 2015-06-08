/* globals angular:false */
;(function(angular){
	'use strict';
	
	angular
		.module('app.controllers')
		.controller('cardModalController', [
			'$scope',
			'card',
			'close',
			controller
		]);
		
	function controller($scope, card, close) {
		$scope.card = card;
		
		$scope.closeModal = function() {
		    //  Now close as normal, but give 500ms for bootstrap to animate
		    close(null, 500);
		  };
	}
	
})(angular);