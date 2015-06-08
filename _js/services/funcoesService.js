;(function(angular, undefined) {
	'use strict';
	
	angular
		.module('app.services')
		.service('funcoesService', [
			'BasicService',
			'funcoesModel',
			srv
		]);
		
	function srv(BasicService, Model) {
		
		return new BasicService({
			Model: Model,
			url: 'funcoes'
		});
		
	}
 })(angular);
