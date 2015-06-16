;(function(undefined) {
	'use strict';
	
	angular
		.module('app.services')
		.service('usuariosService', [
			'BasicService',
			'usuariosModel',
			srv
		]);
		
	function srv(BasicService, Model) {
		
		return new BasicService({
			Model: Model,
			url: 'usuarios',
			nameProp: 'UserName'
		});
		
	}
 })();
