;(function(angular, undefined) {
	'use strict';
	
	angular
		.module('app.models')
		.controller('empresaController', ['empresas', empresaCtrl]);
	
	function empresaCtrl(empresas) {
		var ctrl = this;
		
		ctrl.todas = empresas;
		
		return ctrl;
	}
})(window.angular);