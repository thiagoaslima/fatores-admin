;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.services')
		.service('atividadesEmpresaService', [
			'BasicService',
			'atividadesEmpresaModel',
			srv
		]);

	function srv(BasicService, Model) {

		return new BasicService({
			Model: Model,
			url: 'atividadesempresa'
		});

	}
})(angular);
