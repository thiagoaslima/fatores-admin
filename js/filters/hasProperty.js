/* globals angular: false */

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
