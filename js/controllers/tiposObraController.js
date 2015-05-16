;(function(angular, undefined) {
	'use strict';
	
	angular
		.module('app.controllers')
		.controller('tiposObraController', [
			'$scope',
			'$state',
			'modelItem',
			'tiposObraService',
			'isFilter',
			ctrl
		]);
		
	function ctrl($scope, $state, tipo, tiposObra, is) {
		var _update = false;
		
		angular.extend($scope, {
			padrao: tipo,
			padroesObra: tiposObra
		});
		
		// botoes
		$scope.btn = {
			salvar: true,
			apagar: true
		};
		
		init();

		function init() {
			if (is.object(tipo) && tipo.Id && tipo.Id !== 0) {
				_update = true;
			} else {
				// nova empresa
				$scope.btn.apagar = false;
			}
		}
	}
	
 })(angular);
