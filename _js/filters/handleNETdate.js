;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.filters')
		.filter('handleNetdate', [
			'isFilter',
			filter
		])
		;

	function filter(is) {
		return function NETdate(value) {
			var _jsTime;

			if (is.date(value)) {
				_jsTime = value;
			}

			if (is.number(value)) {
				_jsTime = new Date(value);
			}

			if (String.prototype.indexOf.call(value, '\/Date(') === 0) {
				value = value.replace('\/Date(', '').replace(')\/', '');
				_jsTime = new Date(parseInt(value, 10));
			}

			_jsTime.toNet = function toNET() {
				return '/Date(' + this.getTime() + ')/';
			};

			return _jsTime;
		};
	}

})(angular);
