;(function(angular, undefined) {
	'use strict';
	
	angular
		.module('app.services')
		.service('obrasService', [
			'BasicService',
			'obrasModel',
			srv
		]);
		
	function srv(BasicService, Model) {
		
		return new BasicService({
			Model: Model,
			url: 'obras'
		});
		
	}
 })(angular);
