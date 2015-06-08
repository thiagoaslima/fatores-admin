;(function(angular, undefined) {
	'use strict';
	
	angular
		.module('app.services')
		.service('Login', [
			'$rootScope',
			service
		])
		;
		
	function service($root) {
		var _logged = false;
		
		var Login = {
			isLogged: function(boolean) {
				if (typeof boolean !== 'undefined') {
					_logged = !!boolean;
					$root.$broadcast('login', {logged: _logged});
				}
				return _logged;
			}
		};
		
		return Login;
	}
 })(angular);
