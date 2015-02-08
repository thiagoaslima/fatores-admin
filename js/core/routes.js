;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.routes', [])
		.config([
			'$stateProvider',
			'$urlRouterProvider',
			routing
		])
		;

	function routing($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('empresas', {
				url: '/',
				templateUrl: 'js/empresas/empresa.html',
				controller: 'empresaController',
				controllerAs: 'empresas',
				resolve: {
					empresas: ['$q', 'empresaService', function ($q, empSrv) {
							return $q.when(empSrv.query({$orderby: 'RazaoSocial'}));
						}]
				}
			})
			.state('empresas.editar', {
				url: '/:id/editar',
				templateUrl: 'js/empresas/empresaEditar.html',
				controller: 'empresaEditarController',
				controllerAs: 'empresas',
				resolve: {
					empresa: ['$q', '$stateParams', 'empresaService',
						function ($q, $stateParams, empSrv) {
							return $q.when(empSrv.get($stateParams.id));
						}],
					areasAtuacao: ['API', function (API) {
							return API.prototype.query('AreasAtuacao', {$orderby: 'Nome'});
						}]
				}
			})
			;
	}

})(window.angular);