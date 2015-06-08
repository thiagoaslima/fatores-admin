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
				'buildHierarchyFilter',
				'containsFilter',
				'filterFilter',
                ctrl
            ]);

    function ctrl($scope, params, URLS, items, buildHierarchy, contains, filter) {
		
		var filteredEntities = [{
			entidade: 'obras',
			prop: 'ObraId'
		}, {
			entidade: 'cenarioValores',
			prop: 'CenarioId'
		}, {
			entidade: 'atividades',
			prop: 'AtividadeId'
		}];
		var filtered = contains(filteredEntities, params.submodel);  
		
		if (filtered >= 0) {
			var prop = filteredEntities[filtered].prop;
			var id = parseInt(params.id, 10);
			
			items = items.filter(function(item) {
				return item[prop] === id; 
			});
		}
		
		
		var propriedades = ['ObraId', 'AtividadeId'];
		var prop = propriedades.filter(hasProperty)[0];
	
		if (!!prop) {
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
		
		var prop = items[0] && items[0].RazaoSocial ? 'RazaoSocial' : 'Nome';
		$scope.$watch('filtrarSubmodel', function (value, oldValue) {	
			if (value !== oldValue) {
				var obj = {};
				obj[prop] = value;
				
				$scope.items = filter(items, obj);
			}
		})
		
		// ---------------------------------------------------------------
		// ---------------------------------------------------------------

		function hasProperty(prop) {
			return items && items[0] &&
				items[0].hasOwnProperty(prop) ? prop : false;
		}
		
		function contains(array, value) {
			value = value.toLowerCase();
			
			var index = -1;
			array.map(function(item) {
				return item.entidade.toLowerCase();
			}).forEach(function(name, idx) {
				if (index >= 0) {
					return;
				}
				if (name === value) {
					index = idx;
				}
			});
			
			return index;
		}
	}
})(angular);