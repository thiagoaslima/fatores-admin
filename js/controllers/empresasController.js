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
		
		ctrl.gravar = function ctrlGravar() {
			return basicController.gravar(empresasService, empresa);
		};
		
		ctrl.delete = function ctrlApagar() {
			return basicController.apagar(empresasService, empresa);	
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

//		ctrl.gravar = function () {
//			return empresas.save(empresa)
//				.then(function(resp) {
//					reload(resp.Id);	
//					showSuccess.bind(null, msgs.sucesso);
//				})
//				.catch(showError.bind(null, msgs.erro));
//		};
//
//		ctrl.delete = function () {
//			return empresas.delete(empresa)
//				.then(showSuccess)
//				.catch(showError);
//		};

		// ---------------------------------------------------------------
		// ---------------------------------------------------------------

		function redirect(resp) {
			// se o $scope possuir a propriedade submodelId
			// estamos na view do submodel
			if ($scope.submodelId) {
				$state.go('submodel', {submodelId: resp.Id});
			} else {
				$state.go('model', {modelId: resp.Id});
			}

			return resp;
		}

		return ctrl;
	}
})(window.angular);