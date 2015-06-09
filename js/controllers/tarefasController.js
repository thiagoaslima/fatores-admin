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
		'ModalService',
		'CardService',
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
		ModalService,
		CardService,
		basicController,
		sort,
		is
		) {

		var ctrl = this;
		var _update = false;
		var Card = angular.copy(CardService);		


		$scope.tarefa = tarefa;
		window.tarefa = tarefa;

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
			var deps = ['funcoes'];
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


		/* Cenarios & CenariosValor */
		var _cenarios = cenariosService.query();
		var _cenarioValores = cenarioValoresService.query();

		var mediator = {};
		$q.all({
			cenarios: _cenarios,
			valores: _cenarioValores
		}).then(function (obj) {
			var map = {};
			var mapValores = {};
			var cenarios = [];

			obj.cenarios.forEach(function (cenario) {
				cenario.CenarioValores = [];
				map[cenario.Id] = Object.create(Card, {
					Id: { value: cenario.Id },
					Nome: { value: cenario.Nome.toLowerCase() },
					Model: { value: tarefa }
				});
				map[cenario.Id].Cenario = cenario;
			});

			obj.valores.forEach(function (valor) {
				var id = valor.CenarioId;
				mapValores[valor.Id] = valor;
				map[id].Cenario.CenarioValores.push(valor);
			});

			tarefa.CenariosValor.forEach(function (value) {
				var card = map[mapValores[value].CenarioId];

				if (card.Type === 'none') {
					card.Type = 'cenario';
				}

				if (card.Type !== 'none' && card.Type !== 'cenario') {
					throw new Error('O mesmo cenario ' + card.cenario.Nome + '(' + card.cenario.Id + ') está definido como atributo e como cenário');
				}

				card.Valores = card.Valores.concat(value);
			});

			tarefa.AtributosProducao.forEach(function (value) {
				var card = map[mapValores[value].CenarioId];

				if (card.Type === 'none') {
					card.Type = 'atributo';
				}

				if (card.Type !== 'none' && card.Type !== 'atributo') {
					throw new Error('O mesmo cenario ' + card.Cenario.Nome + '(' + card.Cenario.Id + ') está definido como atributo e como cenário');
				}

				card.Valores = card.Valores.concat(value);
			});

			cenarios = Object.keys(map).map(function (id) {
				var card = map[id];
				card.Cenario.CenarioValores = sort(card.Cenario.CenarioValores, 'Nome');
				return card;
			});

			mediator.Cenarios = sort(cenarios, 'Nome');
			$scope.mediator = mediator;
			window.mediator = mediator;
			return { Cenarios: cenarios };
		});

		// Modal Service
		// --------------------------------------------------
		
		$scope.showModal = function (card) {
			// Just provide a template url, a controller and call 'showModal'.
			ModalService.showModal({
				templateUrl: "js/views/modals/cenario-cenarioValor.html",
				controller: "cardModalController",
				inputs: {
					card: card,
					options: ['cenario', 'atributo']
				}
			}).then(function(modal) {
//			    modal.close.then(function(result) {
//			      console.log(result);
//			    });
		  });
		};
		
		
		

	}
})(window.angular);