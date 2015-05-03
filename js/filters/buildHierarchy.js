/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

;(function(angular, undefined) {
	'use strict';
	
	angular
		.module('app.filters')
		.filter('buildHierarchy', filter);
	
	function filter() {
		return function buildHierarchy(items, prop) {
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
			});
		};
	}
	
 })(angular);
