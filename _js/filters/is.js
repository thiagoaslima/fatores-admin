// base on is.js
// http://arasatasaygin.github.io/is.js/
// https://github.com/arasatasaygin/is.js/blob/master/is.js

;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.filters')
		.filter('is', is);

	function is() {
		var is = {};

		// define interfaces
		is.not = {};
		is.all = {};
		is.any = {};

		// cache some methods to call later on
		var toString = Object.prototype.toString;
		var arraySlice = Array.prototype.slice;
		var hasOwnProperty = Object.prototype.hasOwnProperty;



		/*
		 * type check
		 * --------------------------------------------------------
		 */

		// is a given value Array?
		is.array = Array.isArray || function (value) {    // check native isArray first
			return toString.call(value) === '[object Array]';
		};

		// is a given value Boolean?
		is.boolean = function (value) {
			return value === true || value === false || toString.call(
				value) === '[object Boolean]';
		};

		// is a given value Date object?
		is.date = function (value) {
			return toString.call(value) === '[object Date]' &&
				value.toString() !== 'Invalid Date';
		};

		// is a given value function?
		is.function = function (value) {    // fallback check is for IE
			return toString.call(
				value) === '[object Function]' || typeof value === 'function';
		};
		
		// is a given value NaN?
		is.nan = function (value) {    // NaN is number :) Also it is the only value which does not equal itself
			return value !== value;
		};

		// is a given value null?
		is.null = function (value) {
			return value === null || toString.call(value) === '[object Null]';
		};

		// is a given value number?
		is.number = function (value) {
			return toString.call(value) === '[object Number]';
		};

		is.object = function (value) {
			return toString.call(value) === "[object Object]";
		};



		/*
		 * date check
		 * --------------------------------------------------------
		 */

		is.date.formatted = function (value) {
			return is.date(new Date(value));
		};

		is.date.formatted.as = {
			isoString: function (value) {
				var regexp = new RegExp(
					'^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}', 'i');
				return is.date.formatted(value) && regexp.test(value);
			}
		};


		/*
		 * 
		 * @param {type} func
		 */

		// has a given object got parameterized count property?
		is.object.with = {};
		is.object.with.properties = function (count, obj) {
			if (!is.object(obj) || !is.number(count)) {
				return false;
			}
			if (Object.keys) {
				return Object.keys(obj).length === count;
			}
			var properties = [],
				property;
			for (property in obj) {
				if (hasOwnProperty.call(obj, property)) {
					properties.push(property);
				}
			}
			return properties.length === count;
		};

		is.object.empty = is.object.with.properties.bind(null, 0);


		/*
		 * helpers
		 * ----------------------------------------------------------
		 */

		// helper function which reverses the sense of predicate result
		function not(func) {
			return function () {
				return !func.apply(null, arraySlice.call(arguments));
			};
		}

		// helper function which call predicate function per parameter and return true if all pass
		function all(func) {
			return function () {
				var parameters = arraySlice.call(arguments);
				var length = parameters.length;
				if (length === 1 && is.array(parameters[0])) {    // support array
					parameters = parameters[0];
					length = parameters.length;
				}
				for (var i = 0; i < length; i++) {
					if (!func.call(null, parameters[i])) {
						return false;
					}
				}
				return true;
			};
		}

		// helper function which call predicate function per parameter and return true if any pass
		function any(func) {
			return function () {
				var parameters = arraySlice.call(arguments);
				var length = parameters.length;
				if (length === 1 && is.array(parameters[0])) {    // support array
					parameters = parameters[0];
					length = parameters.length;
				}
				for (var i = 0; i < length; i++) {
					if (func.call(null, parameters[i])) {
						return true;
					}
				}
				return false;
			};
		}

		// API
		// Set 'not', 'all' and 'any' interfaces to methods based on their api property
		/* -------------------------------------------------------------------------- */

		function setInterfaces() {
			var options = is;
			for (var option in options) {
				if (hasOwnProperty.call(options, option) && is.function(options[option])) {
					var interfaces = options[option].api || ['not', 'all', 'any'];
					for (var i = 0; i < interfaces.length; i++) {
						if (interfaces[i] === 'not') {
							is.not[option] = not(is[option]);
						}
						if (interfaces[i] === 'all') {
							is.all[option] = all(is[option]);
						}
						if (interfaces[i] === 'any') {
							is.any[option] = any(is[option]);
						}
					}
				}
			}
		}
		setInterfaces();

		return is;
	}

})(window.angular);