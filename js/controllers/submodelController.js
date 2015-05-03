;
(function (angular, undefined) {
    'use strict';

    angular
            .module('app.controllers')
            .controller('submodelController', [
                '$scope',
                '$stateParams',
                'APP_URLS',
                'subitems',
                ctrl
            ]);

    function ctrl($scope, params, URLS, items) {
		
		var propriedades = ['ObraId'];
		var prop = propriedades.filter(hasProperty)[0];
	
		if (prop) {
			items = buildHierarchy(items, prop);
		}
		
        angular.extend($scope, {
            items: items,
            model: params.model,
            modelId: params.id,
            submodel: params.submodel,
            submodelId: params.subid,
            formUrl: function (entidade) {
                return URLS.views.forms + entidade.toLowerCase() + '.html';
            },
            ctrl: function(entidade) {
                return entidade + 'Controller';
            }
        });
		
		// ---------------------------------------------------------------
		// ---------------------------------------------------------------

		function hasProperty(prop) {
			return items && items[0] &&
				items[0].hasOwnProperty(prop) ? prop : false;
		}

		function buildHierarchy(items, prop) {
			var lista = {};

			items.forEach(function (item) {
				if (item[prop]) {
					lista[item[prop]] = lista[item[prop]] || {};
					var parent = lista[item[prop]];
					parent.children = parent.children || [];
					parent.children.push(item);
				} else {
					var children = lista[item.Id] ? lista[item.Id].children.slice() : [];
					lista[item.Id] = item;
					lista[item.Id].children = children;
				}
			});

			return Object.keys(lista).map(function (item) {
				return lista[item];
			}).filter(function (obj) {
				return obj.hasOwnProperty(prop) && !obj[prop];
			})
		}
	}
})(angular);