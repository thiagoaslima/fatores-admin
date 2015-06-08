;(function(angular, undefined) {
	'use strict';
	
	angular
		.module('app.services')
		.service('padroesObraService', [
			'BasicService',
			'tiposObraModel',
			srv
		]);
		
	function srv(BasicService, Model) {
		return new BasicService({
			Model: Model,
			url: 'padroesobra'
		});
	}
	
 })(angular);
