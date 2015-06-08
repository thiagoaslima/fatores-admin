;(function(undefined) {
	'use strict';
	
	angular
		.module('app.services')
		.service('atividadesService', [
			'BasicService',
			'atividadesModel',
			srv
		]);
		
	function srv(BasicService, Model) {
		
		return new BasicService({
			Model: Model,
			url: 'atividades'
		});
		
	}
 })();
