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
			ctrl
		]);

	function ctrl($scope, params, URLS, items, hasProperty, buildHierarchy, sort) {

		var nome = items[0].RazaoSocial ? 'RazaoSocial' : 'Nome';
		
		items = sort(items, nome);

		var propriedades = ['ObraId', 'AtividadeId'];
		var prop = propriedades.filter(function(prop) {
			return hasProperty(items, prop);
		})[0];

		if (prop) {
			items = buildHierarchy(items, prop);
		}

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
