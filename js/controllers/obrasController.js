;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.controller('obrasController', [
			'$q',
			'$scope',
			'$state',
			'logger',
			'SIGLAS_ESTADOS',
			'modelItem',
			'obrasService',
			'padroesObraService',
			'tiposObraService',
			'empresasService',
			'cenariosService',
			'cenarioValoresService',
			'ModalService',
			'CardService',
			'sortFilter',
			'isFilter',
			editarCtrl
		]);

	function editarCtrl(
		$q,
		$scope,
		$state,
		logger,
		estados,
		obra,
		service,
		padroesSrv,
		tiposSrv,
		empresasSrv,
		cenariosService,
		cenarioValoresService,
		ModalService,
		CardService,
		sort,
		is) {

		var ctrl = this;
		var _update = false;
		var Card = CardService;	
		
		$scope.estados = estados;
		$scope.obra = obra;

		padroesSrv.query().then(function (resp) {
			$scope.padroesObra = resp;
		});
		
		tiposSrv.query().then(function (resp) {
			$scope.tiposObra = resp;
		});
		
		empresasSrv.query().then(function (resp) {
			$scope.empresas = resp;
		});

		// botoes
		$scope.btn = {
			salvar: true,
			apagar: true
		};

		init();

		function init() {
			if (is.object(obra) && obra.Id && obra.Id !== 0) {
				_update = true;
			} else {
				// nova obra
				$scope.btn.apagar = false;
			}
		}

		var msgs = {
			sucesso: 'A ação foi realzada com sucesso!',
			erro: 'Não foi possível Realizar a solicitação.' + 
				'Por favor, tente novamente mais tarde.'
		};

		ctrl.gravar = function () {

			if (!_update) {
				return service.save(obra)
					.then(redirect)
					.then(showSuccess.bind(null, msgs.sucesso))
					.catch(showError.bind(null, msgs.erro));
			}

			return service.update(obra)
				.then(showSuccess.bind(null, msgs.sucesso))
				.catch(showError.bind(null, msgs.erro));
		};

		ctrl.delete = function () {
			return service.delete(obra)
				.then(showSuccess)
				.catch(showError);
		};
		
		
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
					Model: { value: obra }
				});
				map[cenario.Id].Cenario = cenario;
			});

			obj.valores.forEach(function (valor) {
				var id = valor.CenarioId;
				mapValores[valor.Id] = valor;
				map[id].Cenario.CenarioValores.push(valor);
			});

			obra.CenariosValor.forEach(function (value) {
				var card = map[mapValores[value].CenarioId];

				if (card.Type === 'none') {
					card.Type = 'cenario';
				}

				if (card.Type !== 'none' && card.Type !== 'cenario') {
					throw new Error('O mesmo cenario ' + card.cenario.Nome + '(' + card.cenario.Id + ') está definido como atributo e como cenário');
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
					card: card
				}
			}).then(function(modal) {
//			    modal.close.then(function(result) {
//			      console.log(result);
//			    });
		  });
		};

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

		function showSuccess(msg, resp) {
			logger.sucess(msg);
			return resp;
		}

		function showError(msg, resp) {
			logger.error(msg);
			return resp;
		}

		return ctrl;
	}
})(window.angular);