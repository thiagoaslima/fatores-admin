;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.services')
		.service('basicController', [
		'$state',
		'$location',
		'$injector',
		'buildHierarchyFilter',
		'sortFilter',
		'isFilter',
		service
	]);

	function service(
		$state,
		$location,
		$injector,
		buildHierarchy,
		sort,
		is
		) {

		var Controller = {
			getDeps: getDependencies,
			getHierarchicalDeps: getHierarchicalDependencies,
			getChildDeps: getChildDeps,

			gravar: gravar,
			apagar: apagar
		};
		
		// common controller functions
		// ---------------------------------------------------------
		function getDependencies(scope, array) {
			var services = array.map(injectService);

			services.forEach(function (service, index) {
				var entidade = array[index];
				service.query().then(function (resp) {
					if (resp && resp.length) {
						var name = resp[0].Nome ? 'Nome' : 'RazaoSocial';
						scope[entidade] = sort(resp, name);	
					} 
				});
			});
		}

		function getHierarchicalDependencies(scope, array) {
			var entidades = [];
			var props = [];

			array.forEach(function (obj) {
				entidades.push(obj.entidade);
				props.push(obj.prop);
			});

			entidades.map(injectService).forEach(function (service, index) {
				var entidade = entidades[index];
				service.query().then(function (resp) {
					if (resp && resp.length) {
						var name = resp[0].Nome ? 'Nome' : 'RazaoSocial';
						resp = sort(resp, name);
						scope[entidade] = buildHierarchy(resp, props[index]);	
					}
				});
			});
		}
		
		function getChildDeps(scope, array, id) {
			var entidades = [];
			var props = [];

			array.forEach(function (obj) {
				entidades.push(obj.entidade);
				props.push(obj.prop);
			});

			entidades.map(injectService).forEach(function (service, index) {
				var entidade = entidades[index];
				var prop = props[index];
				service.query().then(function (resp) {
					if (resp && resp.length) {
						var name = resp[0].Nome ? 'Nome' : 'RazaoSocial';
						resp = resp.filter(function (item) {
							return item[prop] === id;
						});
						scope[entidade] = sort(resp, name);
					}
				});
			});
		}

		function gravar(service, item) {
			return service.save(item).then(function (resp) {
				reload(resp.Id);
			});
		}
		
		function apagar(service, item) {
			return service.delete(item).then(function() {
				$state.go('^');
			});
		}
 		
		// internal functions
		// ---------------------------------------------------------
		function injectService(name) {
			return $injector.get(name + 'Service');
		}
		
		function reload(id) {
			var path = $location.path();
			if (path.indexOf('nova') > -1 && !!id) {
				$location.path(path.replace('nova', id));
			} else {
				$state.reload();	
			}
		}

		return Controller;
	}

})(angular);
