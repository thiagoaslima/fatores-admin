;(function(angular, undefined) {
	'use strict';
	
	angular
		.module('app.controllers')
		.controller('appController',[
			'$scope',
			'$stateParams',
			'APP_URLS',
			'entidades',
			'Login',
			ctrl
		])
		;
	
	function ctrl($scope, params, URLS, entidades, Login) {
		$scope.entidades = entidades.filter(function(entidade) {
			return entidade.UI && entidade.ListOnSidebar;
		});
		
		$scope.logged = Login.isLogged();
		$scope.$on('login', function(obj) {
			$scope.logged = obj.logged;
		});
	}
	
 })(angular);
