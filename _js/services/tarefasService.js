;(function(angular, undefined) {
	'use strict';
	
	angular
		.module('app.services')
		.service('tarefasService', [
			'BasicService',
			'tarefasModel',
			srv
		]);
		
	function srv(BasicService, Model) {
		
		return new BasicService({
			Model: Model,
			url: 'tarefas'
		});
		
	}
 })(angular);
