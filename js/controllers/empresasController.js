;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.controller('empresasController', [
			'$scope',
			'$state',
			'$location',
			'SIGLAS_ESTADOS',
			'modelItem',
			'empresasService',
			'basicController',
			'isFilter',
			editarCtrl
		]);

	function editarCtrl(
		$scope,
		$state,
		$location,
		estados,
		empresa,
		empresasService,
		basicController,
		is 
		) {

		var ctrl = this;
		var _update = false;

		$scope.estados = estados;
		$scope.empresa = empresa;

		// botoes
		$scope.btn = {
			salvar: true,
			apagar: true
		};
		
		ctrl.gravar = function ctrlgravar() {
			return basicController.gravar(empresasService, empresa);
		};

		init();

		function init() {
			var deps = ['areasAtuacao', 'portesEmpresa', 'tarefas'];
			basicController.getDeps($scope, deps);
	
			var hierarchical = [{
				entidade: 'obras',
				prop: 'ObraId'	
			}];
			basicController.getHierarchicalDeps($scope, hierarchical);
			
			if (is.object(empresa) && empresa.Id && empresa.Id !== 0) {
				_update = true;
			} else {
				// nova empresa
				empresa.EnderecoUF = 'RJ';
				$scope.btn.apagar = false;
			}
		}

		// ---------------------------------------------------------------
		// ---------------------------------------------------------------

		/*function redirect(resp) {
			// se o $scope possuir a propriedade submodelId
			// estamos na view do submodel
			if ($scope.submodelId) {
				$state.go('submodel', {submodelId: resp.Id});
			} else {
				$state.go('model', {modelId: resp.Id});
			}

			return resp;
		}*/

		return ctrl;
	}
})(window.angular);