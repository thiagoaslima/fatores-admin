;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.services')
		.service('BasicController', [
			'$state',
			'$injector',
			'buildHierarchyFilter',
			'isFilter',
			service
		]);

	function service(
		$state,
		$injector,
		buildHierarchy,
		is
		) {
		
		
		var Controller = {
			getDeps: getDependencies,
			getHierarchicalDeps:getHierarchicalDependencies 
		};
		
		function getDependencies(scope, array) {
			var services = array.map(injectService);
			
			services.forEach(function(service, index) {
				var entidade = array[index];
				service.query().then(function(resp) {
					scope[entidade] = resp; 
				});
			});
		}
		
		function getHierarchicalDependencies(scope, array) {
			var entidades = [];
			var props = [];
			
			array.forEach(function(obj) {
				entidades.push(obj.entidade);
				props.push(obj.prop);
			});
			
			var services = entidades.map(injectService);
			
			services.forEach(function(service, index) {
				var entidade = entidades[index];
				service.query().then(function(resp) {
					scope[entidade] = buildHierarchy(resp, props[index]); 
				});
			});
		}
		
		function injectService(name) {
			return $injector.get(name + 'Service');
		}
		
		return Controller;
	}

})(angular);
