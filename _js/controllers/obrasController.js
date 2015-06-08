;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.controller('obrasController', [
			'$scope',
			'$state',
			'logger',
			'SIGLAS_ESTADOS',
			'modelItem',
			'obrasService',
			'padroesObraService',
			'tiposObraService',
			'empresasService',
			'isFilter',
			editarCtrl
		]);

	function editarCtrl(
		$scope,
		$state,
		logger,
		estados,
		obra,
		service,
		padroesSrv,
		tiposSrv,
		empresasSrv,
		is) {

		var ctrl = this;
		var _update = false;
		
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