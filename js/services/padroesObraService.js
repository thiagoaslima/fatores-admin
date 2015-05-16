;(function(angular, undefined) {
	'use strict';
	
	angular
		.module('app.services')
		.service('portesEmpresaService', [
			'BasicService',
			'portesEmpresaModel',
			srv
		]);
		
	function srv(BasicService, Model) {
		return new BasicService({
			Model: Model,
			url: 'portesempresa'
		});
	}
	
 })(angular);
