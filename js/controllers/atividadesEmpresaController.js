;(function(angular, undefined) {
	'use strict';
	
	angular
		.module('app.controllers')
		.controller('atividadesEmpresaController', [
			'$scope',
			'$state',
			'modelItem',
			'atividadesEmpresaService',
			'isFilter',
			ctrl
		]);
		
	function ctrl($scope, $state, atividade, atividadesEmpresa, is) {
		var _update = false;
		
		angular.extend($scope, {
			atividade: atividade,
			atividades: atividadesEmpresa
		});
		
		// botoes
		$scope.btn = {
			salvar: true,
			apagar: true
		};
		
		init();

		function init() {
			if (is.object(atividade) && atividade.Id && atividade.Id !== 0) {
				_update = true;
			} else {
				$scope.btn.apagar = false;
			}
		}
	}
	
 })(angular);
