;(function(angular, undefined) {
	'use strict';
	
	angular
		.module('app.services')
		.service('tiposObraService', [
			'BasicService',
			'padroesObraModel',
			srv
		]);
		
	function srv(BasicService, Model) {
		return new BasicService({
			Model: Model,
			url: 'tiposobra'
		});
	}
	
 })(angular);
