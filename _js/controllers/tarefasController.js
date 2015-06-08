;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.controller('tarefasController', [
			'$scope',
			'$state',
			'logger',
			'SIGLAS_ESTADOS',
			'modelItem',
			'tarefasService',
			'empresasService',
			'funcoesService',
			'isFilter',
			editarCtrl
		]);

	function editarCtrl(
		$scope,
		$state,
		logger,
		estados,
		tarefa,
		tarefas,
		empresasSrv,
		funcoesSrv,
		is) {

		var ctrl = this;
		var _update = false;
		
		$scope.estados = estados;
		$scope.tarefa = tarefa;
		
		empresasSrv.query().then(function(resp) {
			$scope.empresas = resp;
		});
		
		funcoesSrv.query().then(function(resp) {
			$scope.funcoes = resp;
		})

		// botoes
		$scope.btn = {
			salvar: true,
			apagar: true
		};

		init();

		function init() {
			if (is.object(tarefa) && tarefa.Id && tarefa.Id !== 0) {
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
				return tarefas.save(tarefa)
					.then(redirect)
					.then(showSuccess.bind(null, msgs.sucesso))
					.catch(showError.bind(null, msgs.erro));
			}

			return tarefas.update(tarefa)
				.then(showSuccess.bind(null, msgs.sucesso))
				.catch(showError.bind(null, msgs.erro));
		};

		ctrl.delete = function () {
			return tarefas.delete(tarefa)
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