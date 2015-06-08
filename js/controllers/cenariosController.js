;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.controller('cenariosController', [
			'$scope',
			'$state',
			'$location',
			'modelItem',
			'cenariosService',
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

		$scope.cenario = item;

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
			var deps = [{
				entidade: 'cenarioValores',
				prop: 'CenarioId'
			}];
			basicController.getChildDeps($scope, deps, item.Id);
//	
//			var hierarchical = [{
//				entidade: 'obras',
//				prop: 'ObraId'	
//			}];
//			basicController.getHierarchicalDeps($scope, hierarchical);
			
			if (is.object(item) && item.Id && item.Id !== 0) {
				_update = true;
			} else {
				// nova empresa
				$scope.btn.apagar = false;
			}
		}

		// ---------------------------------------------------------------
		// ---------------------------------------------------------------

		return ctrl;
	}
})(window.angular);