;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app', [
			'app.core',
			'app.routes',
			'app.models',
			'app.filters'
		])
		.value("DB_URL", "https://fatoresweb.azurewebsites.net/oData/v1/")
		;

})(window.angular);