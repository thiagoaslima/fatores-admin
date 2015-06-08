;(function(angular, undefined) {
	'use strict';
	
	angular
		.module('app.services')
		.service('cenarioValoresService', [
			'BasicService',
			'cenarioValoresModel',
			srv
		]);
		
	function srv(BasicService, Model) {
		
		return new BasicService({
			Model: Model,
			url: 'cenariovalores'
		});
		
	}
 })(angular);