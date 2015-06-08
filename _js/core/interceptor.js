;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.core')
		.factory('convertDateToServiceFormat', [
			'$q',
			'$location',
			'isFilter',
			function ($q, $location, is) {
				return {
					request: function (req) {
						req.data && Object.keys(req.data).forEach(function(elem) {
							var obj = req.data[elem];
							
							is.object(obj) && Object.keys(obj).forEach(function(prop) {
								if (is.date(obj[prop]) && typeof obj[prop]['toNet'] === 'function') {
									req.data[elem][prop] = obj[prop]['toNet']();
								}
							});
							
						});
						
						return req;
					}
				};
			}]);


	angular
		.module('app.core')
		.config(['$httpProvider', function ($httpProvider) {
				$httpProvider.interceptors.push('convertDateToServiceFormat');
			}]);

})(angular);
