;(function (angular, undefined) {
	'use strict';
	
	angular
		.module('app.models')
		.controller('empresaEditarController', [
			'$scope',
			'empresa',
			'areasAtuacao',
			editarCtrl
		]);
		
	function editarCtrl($scope, empresa, areasAtuacao) {
		var ctrl = this;
		
		angular.extend($scope, {
			empresa: empresa,
			areasAtuacao: areasAtuacao
		});
		
		return ctrl;
	}
})(window.angular);