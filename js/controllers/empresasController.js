;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.models')
		.controller('empresasController', [
			'$scope',
			'$state',
			'logger',
			'SIGLAS_ESTADOS',
			'modelItem',
			'empresasService',
			'areasAtuacaoService',
			'portesEmpresaService',
			'obrasService',
			'buildHierarchyFilter',
			'isFilter',
			editarCtrl
		]);

	function editarCtrl(
		$scope,
		$state,
		logger,
		estados,
		empresa,
		empresas,
		areasAtuacaoSrv,
		portesEmpresaSrv,
		obrasSrv,
		buildHierarchy,
		is) {

		var ctrl = this;
		var _update = false;

		areasAtuacaoSrv.query().then(function (resp) {
			$scope.areasAtuacao = resp;
		});
		portesEmpresaSrv.query().then(function (resp) {
			$scope.portesEmpresa = resp;
		});
		
		obrasSrv.query().then(function (resp) {
			$scope.obras = buildHierarchy(resp, 'ObraId');
		});

		angular.extend($scope, {
			estados: estados,
			empresa: empresa
		});

		// botoes
		$scope.btn = {
			salvar: true,
			apagar: true
		};

		init();

		function init() {
			if (is.object(empresa) && empresa.Id && empresa.Id !== 0) {
				_update = true;
			} else {
				// nova empresa
				empresa.EnderecoUF = 'RJ';
				$scope.btn.apagar = false;
			}
		}

		var msgs = {
			sucesso: 'A obra ' + empresa.RazaoSocial + ' foi atualizada com sucesso!',
			erro: 'Não foi possível atualizar a empresa' + empresa.RazaoSocial + 
				'. Tente novamente mais tarde.'
		};

		ctrl.gravar = function () {

			if (!_update) {
				return empresas.save(empresa)
					.then(redirect)
					.then(showSuccess.bind(null, msgs.sucesso))
					.catch(showError.bind(null, msgs.erro));
			}

			return empresas.update(empresa)
				.then(showSuccess.bind(null, msgs.sucesso))
				.catch(showError.bind(null, msgs.erro));
		};

		ctrl.delete = function () {
			return empresas.delete(empresa)
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