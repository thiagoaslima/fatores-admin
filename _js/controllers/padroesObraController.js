;(function(angular, undefined) {
	'use strict';
	
	angular
		.module('app.controllers')
		.controller('padroesObraController', [
			'$scope',
			'$state',
			'modelItem',
			'padroesObraService',
			'isFilter',
			ctrl
		]);
		
	function ctrl($scope, $state, padrao, padroesObra, is) {
		var _update = false;
		
		angular.extend($scope, {
			padrao: padrao,
			padroesObra: padroesObra
		});
		
		// botoes
		$scope.btn = {
			salvar: true,
			apagar: true
		};
		
		init();

		function init() {
			if (is.object(padrao) && padrao.Id && padrao.Id !== 0) {
				_update = true;
			} else {
				// nova empresa
				$scope.btn.apagar = false;
			}
		}
	}
	
 })(angular);
