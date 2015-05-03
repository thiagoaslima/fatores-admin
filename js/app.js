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
			'app.filters'
		])
		.value("DB_URL", "https://fatoresweb.azurewebsites.net/")
		.config(['$httpProvider', function ($httpProvider) {
            $httpProvider.defaults.headers.post['Content-Type'] =  'application/x-www-form-urlencoded';
			$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        }])
		;

})(window.angular);