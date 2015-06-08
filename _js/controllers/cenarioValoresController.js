;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.controller('cenarioValoresController', [
			'$scope',
			'$state',
			'$location',
			'modelItem',
			'cenarioValoresService',
			'basicController',
			'isFilter',
			editarCtrl
		]);

	function editarCtrl(
		$scope,
		$state,
		$location,
		item,
		service,
		basicController,
		is 
		) {

		var ctrl = this;
		var _update = false;

		$scope.cenarioValor = item;

		// botoes
		$scope.btn = {
			salvar: true,
			apagar: true
		};
		
		ctrl.gravar = function ctrlgravar() {
			return basicController.gravar(service, item);
		};

		init();

		function init() {
			if (is.object(item) && item.Id && item.Id !== 0) {
				_update = true;
			} else {
				// nova empresa
				$scope.btn.apagar = false;
				item.CenarioId = $state.params.id;
			}
		}

		// ---------------------------------------------------------------
		// ---------------------------------------------------------------

		return ctrl;
	}
})(window.angular);