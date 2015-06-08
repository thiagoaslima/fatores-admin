;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.core')
		// Log route change
		.run([
			'$rootScope',
			'$state',
			'$stateParams',
//			'logger',
			function ($rootScope, $state, $stateParams) {

				$rootScope.$on('$stateChangeStart',
					function (event, toState, fromState) {
						console.debug(arguments);
					});

				$rootScope.$on('$stateChangeSuccess', function (event, toState) {
					console.debug(arguments);
				});

				$rootScope.$on('$stateChangeError',
					function (event, toState, toParams, fromState,
						fromParams, error) {
						console.debug(arguments);
					});
			}]);
})(window.angular);