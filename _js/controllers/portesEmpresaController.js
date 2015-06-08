;(function(angular, undefined) {
	'use strict';
	
	angular
		.module('app.controllers')
		.controller('portesEmpresaController', [
			'$scope',
			'$state',
			'modelItem',
			'portesEmpresaService',
			'isFilter',
			ctrl
		]);
		
	function ctrl($scope, $state, porte, portesEmpresa, is) {
		var _update = false;
		
		$scope.porte = porte;
		
		// botoes
		$scope.btn = {
			salvar: true,
			apagar: true
		};
		
		init();

		function init() {
			if (is.object(area) && area.Id && area.Id !== 0) {
				_update = true;
			} else {
				// nova empresa
				$scope.btn.apagar = false;
			}
		}
	}
	
 })(angular);
