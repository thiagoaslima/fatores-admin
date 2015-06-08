;
(function (angular, undefined) {
	'use strict';

	angular
		.module('app.core', [
			'ngAnimate',
			'ngMessages',
			
			'checklist-model',
			'angularModalService',
			
			'ui.bootstrap',
			'ui.router'
		])
		.constant('SIGLAS_ESTADOS', [
			{name: 'AC'},
			{name: 'AL'},
			{name: 'AP'},
			{name: 'AM'},
			{name: 'BA'},
			{name: 'CE'},
			{name: 'DF'},
			{name: 'ES'},
			{name: 'GO'},
			{name: 'MA'},
			{name: 'MT'},
			{name: 'MS'},
			{name: 'MG'},
			{name: 'PA'},
			{name: 'PB'},
			{name: 'PR'},
			{name: 'PE'},
			{name: 'PI'},
			{name: 'RJ'},
			{name: 'RN'},
			{name: 'RS'},
			{name: 'RO'},
			{name: 'RR'},
			{name: 'SC'},
			{name: 'SP'},
			{name: 'SE'},
			{name: 'TO'}
		])
		;

})(window.angular);