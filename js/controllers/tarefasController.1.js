;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.controller('tarefasController', [
		'$q',
		'$scope',
		'$state',
		'modelItem',
		'tarefasService',
		'cenariosService',
		'cenarioValoresService',
		'basicController',
		'sortFilter',
		'isFilter',
		editarCtrl
	]);

	function editarCtrl(
		$q,
		$scope,
		$state,
		tarefa,
		tarefasService,
		cenariosService,
		cenarioValoresService,
		basicController,
		sort,
		is
		) {

		var ctrl = this;
		var _update = false;

		$scope.tarefa = tarefa;

		// botoes
		$scope.btn = {
			salvar: true,
			apagar: true
		};

		ctrl.gravar = function ctrlGravar() {
			return basicController.gravar(tarefasService, tarefa);
		};

		ctrl.delete = function ctrlApagar() {
			return basicController.apagar(tarefasService, tarefa);
		};

		init();

		function init() {
			var deps = ['funcoes', 'cenarios'];
			basicController.getDeps($scope, deps);

			var hierarchical = [];
			basicController.getHierarchicalDeps($scope, hierarchical);

			var childDeps = [];
			basicController.getChildDeps($scope, childDeps, $state.params.id);

			if (is.object(tarefa) && tarefa.Id && tarefa.Id !== 0) {
				_update = true;
			} else {
				// nova obra
				$scope.btn.apagar = false;
			}
		}

		var _cenarioValores = [];
		var promise = cenarioValoresService.query().then(function (resp) {
			_cenarioValores = resp.filter(function (cenarioValor) {
				return tarefa.CenariosValor.indexOf(cenarioValor.Id) >= 0;
			});
			return _cenarioValores;
		});

		var cenariosId = $q.when(promise).then(function (lista) {
			var print = false;
			return lista.map(function (obj) {
				return obj.CenarioId;
			}).filter(function (id, index, array) {
				if (!print) {
					console.log(array);
					print = true;
				}
				return array.indexOf(id) === index;
			});
		});

		var mediator = {};
		var _cenarios = [];
		var _atributos = [];
		var _valores = [];
		
		Object.defineProperties(mediator, {
			'cenarios': {
				get: function () {
					return _cenarios;
				},
				set: function (cenarios) {
					tarefa.CenariosValor = _cenarioValores.filter(function (cenarioValor) {
						return cenarios.indexOf(cenarioValor.cenarioId) >= 0;
					});

					_cenarios = cenarios;
				},
				enumerable: true
			}
		});
		$scope.mediator = mediator;

		$q.when(cenariosId).then(function (array) {
			cenariosService.query(array).then(function (resp) {
				resp = sort(resp, 'Nome');
				mediator.cenarios = resp;
			});
		});

		return ctrl;
	}
})(window.angular);