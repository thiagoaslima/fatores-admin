/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

; (function (angular, undefined) {
	'use strict';

	angular
		.module('app.filters')
		.filter('buildHierarchy', filter);

	function filter() {
		return function buildHierarchy(items, prop) {
			var lista = {};
			var map = {};

			items.map(function (item) {
				map[item.Id] = item;
				return item;
			}).forEach(function (item) {
				var id = item[prop];
				var parent = lista[id] || map[item[prop]];

				if (!id || !parent) {
					lista[item.Id] = lista[item.Id] || item;
					return;
				}
				
				parent.children = parent.children || [];
				parent.children.push(item);	

				return item;
			});

			return Object.keys(lista).map(function (item) {
				return lista[item];
			});
		};
	}

})(angular);
