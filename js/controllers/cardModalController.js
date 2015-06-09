/* globals angular:false */
;(function(angular){
	'use strict';
	
	angular
		.module('app.controllers')
		.controller('cardModalController', [
			'$scope',
			'card',
			'options',
			'close',
			controller
		]);
		
	function controller($scope, card, options, close) {
		$scope.card = card;
		
		$scope.options = {};
		options.forEach(function(option) {
			$scope.options[option] = true;
		});
		
		$scope.closeModal = function() {
		    //  Now close as normal, but give 50ms for bootstrap to animate
		    close(null, 50);
		  };
	}
	
})(angular);