;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app', [
		'app.core',
		'app.controllers',
		'app.routes',
		'app.models',
		'app.services',
		'app.filters',
		'app.directives'
		])
		.value("DB_URL", "https://fatoresweb.azurewebsites.net/")
		.config(['$httpProvider', function ($httpProvider) {
			$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
			$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
		}])
		.run(['$http', 'DB_URL', function ($http, DbUrl) {
			return $http({
				method: 'GET',
				url: DbUrl + 'empresas/lista'
			});
		}]);
		;

})(window.angular);