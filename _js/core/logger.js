;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.core')
		.factory('logger', [
			'$rootScope',
			func
		]);

	function func($root) {

		return {
			showSuccess: showSuccess,
			showError: showError
		};
		
		// ----------------------------------------------------------------
		// ----------------------------------------------------------------

		function showSuccess(msg, timeout) {
			$root.sucesso = msg || 'A ação foi realizada com sucesso!';
			$timeout(reset, timeout || 2000);
		}

		function showError(msg, timeout) {
			$root.sucesso = msg || 'Não foi possível completar a açao desejada. Tente novamente mais tarde.';
			$timeout(reset, timeout || 2000);
		}

		function reset() {
			$root.sucesso = '';
			$root.erro = '';
		}

	}

})(angular);
