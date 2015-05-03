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
			'obrasService',
			'isFilter',
			editarCtrl
		]);

	function editarCtrl(
		$scope,
		$state,
		logger,
		estados,
		instance,
		service,
		is) {

		var ctrl = this;
		var _update = false;
		
		$scope.estados = estados;
		$scope[service.modelName] = instance;

		// botoes
		$scope.btn = {
			salvar: true,
			apagar: true
		};

		init();

		function init() {
			if (is.object(instance) && instance.Id && instance.Id !== 0) {
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
				return service.save(instance)
					.then(redirect)
					.then(showSuccess.bind(null, msgs.sucesso))
					.catch(showError.bind(null, msgs.erro));
			}

			return service.update(instance)
				.then(showSuccess.bind(null, msgs.sucesso))
				.catch(showError.bind(null, msgs.erro));
		};

		ctrl.delete = function () {
			return service.delete(instance)
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