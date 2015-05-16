;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.controller('funcoesController', [
			'$scope',
			'$state',
			'logger',
			'modelItem',
			'funcoesService',
			'isFilter',
			editarCtrl
		]);

	function editarCtrl(
		$scope,
		$state,
		logger,
		funcao,
		funcoes,
		is) {

		var ctrl = this;
		var _update = false;

		angular.extend($scope, {
			funcoes: funcoes,
			funcao: funcao
		});

		// botoes
		$scope.btn = {
			salvar: true,
			apagar: true
		};

		init();

		function init() {
			if (is.object(funcao) && funcao.Id && funcao.Id !== 0) {
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
				return funcoes.save(funcao)
					.then(redirect)
					.then(showSuccess.bind(null, msgs.sucesso))
					.catch(showError.bind(null, msgs.erro));
			}

			return funcoes.update(funcao)
				.then(showSuccess.bind(null, msgs.sucesso))
				.catch(showError.bind(null, msgs.erro));
		};

		ctrl.delete = function () {
			return funcoes.delete(funcao)
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
			return resp;
		}

		function showError(msg, resp) {
			return resp;
		}

		return ctrl;
	}
})(window.angular);