;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.controllers')
		.controller('modelController', [
			'$scope',
			'$stateParams',
			'APP_URLS',
			'items',
			'hasPropertyFilter',
			'buildHierarchyFilter',
			'sortFilter',
			'filterFilter',
			ctrl
		]);

	function ctrl($scope, params, URLS, items, hasProperty, buildHierarchy, sort, filter) {

		var nome = items[0].RazaoSocial ? 'RazaoSocial' : 'Nome';
		
		items = sort(items, nome);

		var propriedades = ['ObraId', 'AtividadeId'];
		var prop = propriedades.filter(function(prop) {
			return hasProperty(items, prop);
		})[0];

		if (prop) {
			items = buildHierarchy(items, prop);
		}
		
		var prop = items[0].RazaoSocial ? 'RazaoSocial' : 'Nome';
		$scope.$watch('filtrarModel', function (value, oldValue) {	
			if (value !== oldValue) {
				var obj = {};
				obj[prop] = value;
				
				$scope.items = filter(items, obj);
			}
		})

		angular.extend($scope, {
			items: items,
			model: params.model,
			modelId: params.id,
			submodel: params.submodel,
			submodelId: params.subId,
			formUrl: function (entidade) {
				return URLS.views.forms + entidade + '.html';
			},
			ctrl: function (entidade) {
				return entidade + 'Controller';
			}
		});

	}
})(angular);
