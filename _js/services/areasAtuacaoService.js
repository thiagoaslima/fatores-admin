;(function(angular, undefined) {
	'use strict';
	
	angular
		.module('app.services')
		.service('areasAtuacaoService', [
			'BasicService',
			'areasAtuacaoModel',
			srv
		]);
		
	function srv(BasicService, Model) {
		return new BasicService({
			Model: Model,
			url: 'areasatuacao'
		});
	}
	
 })(angular);
