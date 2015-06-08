;(function(angular, undefined) {
	'use strict';
	
	angular
		.module('app.controllers')
		.controller('areasAtuacaoController', [
			'$scope',
			'$state',
			'modelItem',
			'areasAtuacaoService',
			'isFilter',
			ctrl
		]);
		
	function ctrl($scope, $state, area, areasAtuacao, is) {
		var _update = false;
		
		angular.extend($scope, {
			area: area,
			areasAtuacao: areasAtuacao
		});
		
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
