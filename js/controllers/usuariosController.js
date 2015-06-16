;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.controller('usuariosController', [
		'$q',
		'$scope',
		'$state',
		'modelItem',
		'usuariosService',
		'basicController',
		'sortFilter',
		'isFilter',
		editarCtrl
	]);

	function editarCtrl(
		$q,
		$scope,
		$state,
		usuario,
		usuariosService,
		basicController,
		sort,
		is
		) {

		var ctrl = this;
		var _update = false;		

		$scope.usuario = usuario;

		// botoes
		$scope.btn = {
			salvar: true,
			apagar: true
		};

		ctrl.gravar = function ctrlGravar() {
			return basicController.gravar(usuariosService, usuario);
		};

		ctrl.delete = function ctrlApagar() {
			return basicController.apagar(usuariosService, usuario);
		};

		init();

		function init() {
			var deps = ['empresas', 'tarefas'];
			basicController.getDeps($scope, deps);

			var hierarchical = [{
				entidade: 'obras',
				prop: 'ObraId'
			}];
			basicController.getHierarchicalDeps($scope, hierarchical);

			var childDeps = [];
			basicController.getChildDeps($scope, childDeps, $state.params.id);

			if (is.object(usuario) && usuario.Id && usuario.Id !== 0) {
				_update = true;
			} else {
				$scope.btn.apagar = false;
			}
		}

	}
})(window.angular);