; (function (angular, undefined) {
	'use strict';

	angular
		.module('app.filters')
		.filter('contains', filter);

	function filter() {
		return function contains(array, value) {
			value = value.toLowerCase();
			
			return array.map(function(item) {
				return item.toLowerCase();
			}).some(function(name) {
				return name === value;
			});
		};
	}

})(angular);
