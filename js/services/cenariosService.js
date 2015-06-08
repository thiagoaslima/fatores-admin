;(function(angular, undefined) {
	'use strict';
	
	angular
		.module('app.services')
		.service('cenariosService', [
			'BasicService',
			'cenariosModel',
			srv
		]);
		
	function srv(BasicService, Model) {
		
		return new BasicService({
			Model: Model,
			url: 'cenarios'
		});
		
	}
 })(angular);