;(function(undefined) {
	'use strict';
	
	angular
		.module('app.services')
		.service('empresasService', [
			'BasicService',
			'empresasModel',
			srv
		]);
		
	function srv(BasicService, Model) {
		
		return new BasicService({
			Model: Model,
			url: 'empresas',
			nameProp: 'RazaoSocial'
		});
		
	}
 })();
