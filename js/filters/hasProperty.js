/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

;(function(angular, undefined) {
	'use strict';
	
	angular
		.module('app.filters')
		.filter('hasProperty', filter);
	
	function filter() {
		return function hasProperty(items, prop) {
			return items && items[0] &&
				items[0].hasOwnProperty(prop) ? prop : false;
		};
	}
	
 })(angular);
