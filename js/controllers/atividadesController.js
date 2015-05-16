;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.controller('atividadesController', [
			'$scope',
			'$state',
			'logger',
			'modelItem',
			'atividadesService',
			'buildHierarchyFilter',
			'isFilter',
			editarCtrl
		]);

	function editarCtrl(
		$scope,
		$state,
		logger,
		atividade,
		atividadesSrv,
		buildHierarchy,
		is) {

		var ctrl = this;
		var _update = false;

		atividadesSrv.query().then(function (resp) {
			$scope.atividades = buildHierarchy(resp, 'AtividadeId');
		});

		$scope.atividade = atividade;

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

		var msgs = {
			sucesso: 'A ação foi realzada com sucesso!',
			erro: 'Não foi possível Realizar a solicitação.' +
				'Por favor, tente novamente mais tarde.'
		};


		ctrl.gravar = function () {

			if (!_update) {
				return atividadesSrv.save(atividade)
					.then(redirect)
					.then(showSuccess.bind(null, msgs.sucesso))
					.catch(showError.bind(null, msgs.erro));
			}

			return atividadesSrv.update(atividade)
				.then(showSuccess.bind(null, msgs.sucesso))
				.catch(showError.bind(null, msgs.erro));
		};

		ctrl.delete = function () {
			return atividadesSrv.delete(atividade)
				.then(showSuccess)
				.catch(showError);
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
//			logger.sucess(msg);
			return resp;
		}

		function showError(msg, resp) {
//			logger.error(msg);
			return resp;
		}

		return ctrl;
	}
})(window.angular);